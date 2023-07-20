import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './Context/user.context';
import { InputMessageProvider } from './Context/inputMessage.context';
import { UserRoomProvider } from './Context/userRoom.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UserRoomProvider>
          <InputMessageProvider>
            <App />   
          </InputMessageProvider>
        </UserRoomProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
