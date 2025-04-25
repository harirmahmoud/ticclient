import React from 'react'
import Board from './Board'

export default function Game({channel}) {
    const [player, setPlayer] = React.useState(
        channel.state.watcher_count === 2
    );
    const [result, setResult] = React.useState({winner: null, state: null});
    channel.on('user.watching.start', () => {
       
            setPlayer( channel.state.watcher_count === 2);
      
    }
    );
    if(!player){
        return <div>Waiting for another player...</div>
      
    }
   
  return (
    <div><h1>Game</h1>
        <Board result={result} setResult={setResult} />
        
        
    </div>
  )
}
