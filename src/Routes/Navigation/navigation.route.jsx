import React, {Fragment, useContext} from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../../Context/user.context";
import { userSignOut } from "../../Utility/firebase.utility";

import './navigation.style.css';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);

    return (
      <Fragment>
        <nav className='navContainer'>
            <div>
                <Link className='logoContainer' to='/'>
                    <span className="logo">ChatBox</span>
                </Link>
            </div>
            <div className="userNavContainer">
                {
                    currentUser ? (
                        <Link className='navlink' onClick={userSignOut} to='/'>
                            Sign Out
                        </Link>
                    ) : (
                        <Link className='navlink' to='/auth'>
                            Sign In
                        </Link>
                    )
                }
            </div>
        </nav>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;