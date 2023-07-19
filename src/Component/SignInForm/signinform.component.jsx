import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { signInWithGoogleRedirect, signInAuthUserWithEmailAndPassword } from "../../Utility/firebase.utility";
import { resetFormFields } from "../../Utility/service.utility";

import './signinform.styles.css'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [err, setErr] = useState(false);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr(false);
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields(setFormFields, defaultFormFields);
        } catch (error) {
            resetFormFields(setFormFields, defaultFormFields);
            setErr(true);
            console.log('User was not signed in. error: ', error);
        }
    }

    return (
        <Fragment>
        { err && <div className="errorMessage">
            <p>User Please check email/password combination again</p>
         </div>}
        <div className="signinboxcontainer"> 


            <div className="shape"></div>
            <div className="shape"></div>

                <form className="formcontainer" onSubmit={handleSubmit}>

                    <h3>Sign In</h3>


                    <label htmlFor='email'>Username</label>
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

                    <button type='submit'>Sign In</button>

                    <p>You can also sign in through: </p>
                    <div className="social">
                        <div className="googleButton" onClick={signInWithGoogleRedirect}>Google</div>
                    </div>

                    <p>Please <Link to='/register'>Register</Link>, if you don't have an account with us! </p>

                </form>
        </div>   
        </Fragment>
    )
}

export default SignInForm;