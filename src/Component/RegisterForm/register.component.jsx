import React, { Fragment, useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../Utility/firebase.utility";
import { resetFormFields } from "../../Utility/service.utility";
import '../SignInForm/signinform.styles.css'
import './register.styles.css';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [err, setErr] = useState('');
    const {displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        setErr('');
        const {name, value} = event.target;
        setFormFields({...formFields,[name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr('');
        resetFormFields(setFormFields, defaultFormFields);

        if (password !== confirmPassword){
            setErr('Please make sure that the passwords match each other. Please try again!'); 
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

        } catch(error) {

            if (error === 'auth/email-already-in-use'){
                setErr('User already exists. Please Sign In')
            } 
            else {
                console.log('Error Signing up: ', error)
                setErr('User authentication failed. Please try again');
            }
        }

    }

    return (
        <Fragment>

            { err && <div className="errorMessage">
             <p>{err}</p>
            </div>}

        <div className="boxcontainer"> 

            <div className="shape registershape"></div>
            <div className="shape registershape"></div>

                <form onSubmit={handleSubmit} className="formcontainer registerformcontainer">
                    <h3>Register</h3>
                    <label htmlFor='displayName'>Name</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="Full Name" 
                        id="displayName"
                        name="displayName"
                        value={displayName}
                        onChange={handleChange}
                        />

                    <label htmlFor='username'>Username</label>
                    <input 
                        required 
                        type="email" 
                        placeholder="Email address" 
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        />

                    <label htmlFor='password'>Password</label>
                    <input 
                        required 
                        type="password" 
                        placeholder="Password" 
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        />

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        required 
                        type="password" 
                        placeholder="Confirm Password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        />

                    <button type="submit">Sign Up</button>

                    <p>You can also register through: </p>

                    <div className="social">
                        <div className="googleButton" onClick={signInWithGoogleRedirect}>Google</div>
                    </div>

                </form>

        </div>
        
        </Fragment>
    )
}

export default Register;