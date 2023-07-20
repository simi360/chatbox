import React, {Fragment, useContext, useRef} from "react";
import './input.styles.css';
import { InputMessageContext } from "../../Context/inputMessage.context";


const Input = ({scroll}) => {
    const {onMessageSubmit} = useContext(InputMessageContext);

    const inputElement = useRef();


    const onMsgSubmit = () => {
        onMessageSubmit(inputElement.current.value);
        inputElement.current.value ='';
        scroll.current.scrollIntoView({behavior: "smooth", block: "end"});
    }

    const handler = (event) => {
        if (event.key === "Enter"){
            onMsgSubmit();
        }
    }
    return (
        <Fragment>
            <div className="inputContainer">
            
                <input className="input" placeholder="Type Here" ref={inputElement} onKeyUp={handler}/>
                <button className="sendButton" onClick={onMsgSubmit}>Send</button>

            </div>
        </Fragment>
    )

}

export default Input;