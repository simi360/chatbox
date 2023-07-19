import React, { Fragment, useEffect, useState, useRef } from "react";
import './chat.styles.css'
import Message from "../../Component/Message/message.component";
import Input from "../../Component/Input/input.component";

//Firestore
import { db } from "../../Utility/firebase.utility";
import {collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
        )

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({...doc.data(), id:doc.id});
            });
            const sortedMessage = fetchedMessages.sort(
                (a,b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessage);
        });
        return () => unsubscribe;
    }, []);


    return (
        <Fragment>
            <div className="chatBoxContainer">
                {
                    messages.map((m) => {
                        return <Message key={m.id} msg={m}/>
                })
                }
            </div>
            <span ref={scroll}></span>
            <Input scroll={scroll}/>
        </Fragment>
    )
}

export default Chat;