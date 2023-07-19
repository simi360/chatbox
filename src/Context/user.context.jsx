import React, { useState, createContext, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../Utility/firebase.utility";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);
    //This logic needs to be in another component like navigation, where currentUser state is imported

    const value = {
        currentUser,
        setCurrentUser
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })   

        return unsubscribe;
    }, [])

    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
        );
};