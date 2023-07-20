import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./user.context";
import { UserRoomContext } from "./userRoom.context";

import {createMessageDoc} from '../Utility/firebase.utility'

export const InputMessageContext = createContext({
    inputMsg: '',
    setInputMsg: ()=> null
});

export const InputMessageProvider =({children}) => {
    const [inputMsg, setInputMsg] = useState('');
    const {currentUser} = useContext(UserContext);
    const {currentRoom} = useContext(UserRoomContext)


    const onMessageSubmit = (message) => {
        setInputMsg(message);
        createMessageDoc(message, currentUser, currentRoom);
    }

    const value = {
        inputMsg,
        setInputMsg,
        onMessageSubmit
    }

    return (
        <InputMessageContext.Provider value={value}>
            {children}
        </InputMessageContext.Provider>
    );
};