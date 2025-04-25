import React from 'react'
import { Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {StreamChat} from 'stream-chat'
import Cookies from 'universal-cookie'
import { Chat } from "stream-chat-react";
import JoinGame from './components/JoinGame'
import { useNavigate } from 'react-router-dom';


function App() {
  const [isAuth,setIsAuth]=React.useState(false);
const client=StreamChat.getInstance('yv76td6hzy4e');
const cookies=new Cookies();
const token=cookies.get('token');
const nav=useNavigate();
React.useEffect(() => {
  if (token) {
    client.connectUser(
      {
        id: cookies.get('userId'),
        name: cookies.get('username'),
        hashedPassword: cookies.get('hashedPassword'),
        image: cookies.get('image'),
      },
      token
    ).then(() => {
      setIsAuth(true);
      nav('/game'); 
    }).catch((error) => {
      console.error('Error connecting user:', error);
    });
  }
}, [token]);
  return (
    <>
      
        <Routes>
          <Route path="/game" element={isAuth ? <Chat client={client}><JoinGame setIsAuth={setIsAuth} /></Chat>  : <Login setIsAuth={setIsAuth} />} />
         
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/signup" element={<SignUp setIsAuth={setIsAuth} />} />

       
        </Routes>
        <footer style={{position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1'}}/>
          <p>© 2025 Tic Tac Toe Game. All rights reserved.</p>
    </>
  )
}

export default App
