import React, {createContext, useState} from "react";

export const UserRoomContext = createContext({
    currentRoom: '',
    setCurrentRoom: () => null
})

export const UserRoomProvider = ({children}) => {
    const [currentRoom, setCurrentRoom] = useState('');

    const value = {
        currentRoom,
        setCurrentRoom
    }

    return (
        <UserRoomContext.Provider value={value}>
            {children}
        </UserRoomContext.Provider>
    )
}