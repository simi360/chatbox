import React, {Fragment, useContext, useState} from "react";
import { Navigate } from "react-router-dom";

import { UserRoomContext } from "../../Context/userRoom.context";
import { resetFormFields } from "../../Utility/service.utility";

//stylesheets
import '../../Component/SignInForm/signinform.styles.css';
import './room.style.css';

const defaultRoom = '';

const Room = () => {
    const [err, setErr] = useState(false);
    const [validRoom, setValidRoom] = useState(false);
    const {currentRoom, setCurrentRoom} = useContext(UserRoomContext);

    const handleChange = (e) => {
        setErr(false);
        setValidRoom(false);
        setCurrentRoom(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentRoom === '' ) {
            setValidRoom(false);
            return;
        }
        if (((currentRoom.match("[0-9]+")[0].length === 4)) && (currentRoom.length === 4)){
            setValidRoom(true);
        } else {
            resetFormFields(setCurrentRoom, defaultRoom);
            setErr(true);
        }

    }

    
    return (
        <Fragment>
            {
                validRoom 
                ?
                <Navigate to={`/userChatbox`} />
                :
                (<div>
                { err && <div className="errorMessage">
                    <p>Please enter 4 numbers!</p>
                </div>}
                <div className="boxcontainer">

                    <div className="shape roomShape"></div>
                    <div className="shape roomShape"></div>

                    <form onSubmit={handleSubmit} className="formcontainer roomcontainer">
                        <label htmlFor="roomNumber"> Please enter the 4-digit room number you want to enter</label>
                        <input 
                            type="number"
                            placeholder="0000"
                            id="roomNumber"
                            onChange={handleChange}
                            name="room"
                            value={currentRoom}
                        />
                        <button>Submit</button>
                    </form>
                </div>
            </div>)}
        </Fragment>
    )
}

export default Room;