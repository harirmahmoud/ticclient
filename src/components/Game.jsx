import React from 'react'
import Board from './Board'

export default function Game({rivalUsername,channel,handlelogout}) {
    const [player, setPlayer] = React.useState(
        channel.state.watcher_count === 2
    );
    const [result, setResult] = React.useState({winner: null, state: null});
    channel.on('user.watching.start', () => {
       
            setPlayer( channel.state.watcher_count === 2);
      
    }
    );
    
    if(!player){
        return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}><button className='logoutt' onClick={handlelogout}>Log Out</button><p>Waiting for another player...</p></div>
      
    }
   
  return (
    <div> <button className='logout' onClick={handlelogout}>Log Out</button>
        <Board rivalUsername={rivalUsername} result={result} setResult={setResult} />
       
        
    </div>
  )
}
