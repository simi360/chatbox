import React, { Fragment, useContext} from 'react';
import { Navigate} from 'react-router-dom';
import SignInForm from '../../Component/SignInForm/signinform.component';
import Register from '../../Component/RegisterForm/register.component';
import { UserContext } from '../../Context/user.context';



const UserAuthentication = (MyComponent) => {

  return function Authentication() {
      const {currentUser} = useContext(UserContext);

        return (
          <Fragment>
            {
              currentUser ?
              <Navigate to='/room' /> :
              <MyComponent /> 
            }
          </Fragment>
        )
  };
}



export const WrappedSignInComponent = UserAuthentication(SignInForm);
export const WrappedRegisterComponent = UserAuthentication(Register);