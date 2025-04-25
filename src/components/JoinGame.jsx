import React from 'react'
import { useChatContext, Channel } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Game from './Game';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'mui-sonner'

export default function JoinGame({setIsAuth}) {
  const [rivalUsername, setRivalUsername] = React.useState('');
  const handleChange = (e) => {
    setRivalUsername(e.target.value);
  }
  const cookies = new Cookies();
  const { client } = useChatContext();
  const [channel, setChannel] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rival Username:', rivalUsername);
    const createChannel=async () => {
      const res=await client.queryUsers({name:{$eq: rivalUsername}});
      if(res.users.length===0){
        alert('User not found');
        return;
      }
      const newchannel=await client.channel('messaging',{
        members:[client.userID,res.users[0].id],
      });
      await newchannel.watch();
      setChannel(newchannel);
    console.log('Joining game with rival:', rivalUsername);
  }
    createChannel();
  }
  const navigate=useNavigate();
  const handlelogout=async () => {
    await client.disconnectUser();
    setChannel(null);
    setIsAuth(false);
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('email');
    cookies.remove('image');
    cookies.remove('hashedPassword');
    toast.success('Logged out successfully!');
    navigate('/');

  }
  return (
    <>
   {channel ? (
    <Channel channel={channel}><Game rivalUsername={rivalUsername} handlelogout={handlelogout} channel={channel}/></Channel>
   ) :(<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
    <Toaster position="top-center" richColors theme="dark" closeButton={false} />
      <h1 className='logo'>Welcome to HWorld</h1>
      <h1>Join Game</h1>
      <form>
        <div>
          <label htmlFor="gameId">Game ID:</label>
          <input onChange={handleChange} placeholder='Username of rival ...' type="text" id="gameId" name="gameId" required />
        </div>
        <button onClick={handleSubmit} type="submit">Join Game</button>
        <button onClick={handlelogout}>Log Out</button>
      </form>
    </div>)}</>
  )
}
