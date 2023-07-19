import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./user.context";

import {createMessageDoc} from '../Utility/firebase.utility'

export const InputMessageContext = createContext({
    inputMsg: '',
    setInputMsg: ()=> null
});

export const InputMessageProvider =({children}) => {
    const [inputMsg, setInputMsg] = useState('');
    const {currentUser} = useContext(UserContext)


    const onMessageSubmit = (message) => {
        setInputMsg(message);
        createMessageDoc(message, currentUser);
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