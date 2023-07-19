import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './Routes/Navigation/navigation.route';
import Home from './Routes/Home/home.route';
import { WrappedRegisterComponent, WrappedSignInComponent } from './Routes/Authentication/authentication.route';
import Chat from './Routes/Chat/chat.route';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='auth' element={<WrappedSignInComponent/>} />
          <Route path='register' element={<WrappedRegisterComponent/>}  />
          <Route path='userChatbox' element={<Chat />} />
        </Route>
      </Routes>
  );
}

export default App;
