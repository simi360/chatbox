import React, { Fragment, useContext } from "react";
import './message.styles.css';
import { UserContext } from "../../Context/user.context";

const Message = (msg) => {
    const {avatar, name, text, uid, createdAt} = msg.msg;
    const {currentUser} = useContext(UserContext);
    return (
        <Fragment>  
            <div className="chatContainer">
                    <div className={`chatBubble ${uid === currentUser.uid ? "right" : ""}`}>

                        <div className="chat-left">
                            <img className="chat-left" src={avatar} alt="OP"/>
                        </div>
                        <div className="chat-right">
                            <div className="name">
                                {name}
                            </div>
                            <div className="message">
                                {text}
                            </div>
                            <div className="timeStamp">
                                {(createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}))}
                            </div>
                        </div>
                    </div>
            </div>       
        </Fragment>
    )
}

export default Message;