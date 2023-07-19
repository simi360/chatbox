import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from './chatbox-logo.png'

import './home.styles.css'

const Home = () => {
    return (
        <Fragment>
            <div className="homeContainer">
                <img src={logo} alt="ChatBox Logo" />
                <h1>ChatBox</h1>
                <div className="homePara">
                    <p>Please <Link to='/auth'>Sign In</Link> to continue catching up with your friends</p>
                    <p> If this is your first time here, please <Link to='/register'>Register</Link>.</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;