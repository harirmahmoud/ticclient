import React, { useEffect, useState } from 'react'
import Square from './Square'
import {useChannelStateContext,useChatContext} from 'stream-chat-react'
import { Patterns } from '../WinningPatterns'
import { Toaster, toast } from 'mui-sonner'


export default function Board({result,setResult,rivalUsername}) {
  const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		return null;
	};
 
  const [board,setBoard]=useState(["","","",
    "","","",
    "","","",])
    const [player,setPlayer]=useState("X")
    const [turn,setTurn]=useState("X")
    const {channel}=useChannelStateContext()
    const {client}=useChatContext()


    useEffect(()=>{
checkWinner()
checkIfTie()
    },[board])
    const handleSquareClick=async(index)=>{
       if(turn===player && board[index]===""){
        setTurn(player==="X"?"O":"X")

        await channel.sendEvent({
          type:"game-move",
          data:{
            player:player,
            index:index
          }
        })
        setBoard(board.map((val,idx)=>{
if(idx===index){
          return player 
        }
        return val
    }
  )
  )
  }
  }
  const [points,setPoints]=useState({
    you:0,
    rival:0
  })
  const checkWinner=()=>{
    Patterns.forEach((pattern)=>{
      const [a,b,c]=pattern
      if(board[a] && board[a]===board[b] && board[a]===board[c]){
        setResult({winner:board[a],state:"Won"})
        if(board[a]===player){
         
          toast.success(`you win !`)
          setPoints({...points,you:points.you+1})
          setTurn(player)
        }
        else{
          toast.error(`${rivalUsername} win !`)
          setPoints({...points,rival:points.rival+1})
          setTurn(player==="X"?"O":"X")
        }
        
        setBoard(["","","",
        "","","",
        "","","",])
      }
    })
  }

  const checkIfTie=()=>{
    let filled=true
    board.forEach((val)=>{
      if(val===""){
        filled=false
      }
    })
    if(filled){
      setResult({winner:null,state:"Tie"})
      toast("Game is Tie")
      
      
      setBoard(["","","",
        "","","",
        "","","",])
    }
  }
  
 
  channel.on(async(event)=>{
    if(event.type=="game-move" && event.user.id!==client.userID){
      
      setPlayer(event.data.player==="X"?"O":"X")
      setTurn(event.data.player==="X"?"O":"X")
      setBoard(board.map((val,idx)=>{
        if(idx===event.data.index && val===""){
          return event.data.player
        }
        return val
      }))
      setTurn(event.data.player==="X"?"O":"X")
    }
  }
  )
  return (
    <div style={{}}>
      <Toaster position='top-center' />
        
        <h1 style={{display:"flex",justifyContent:"center"}}>{getCookie("username")} is {player}</h1>
        <h1 style={{display:"flex",justifyContent:"center"}}>{turn===player ? getCookie("username"):rivalUsername}'s turn now </h1>
       <div>
        <div style={{display:"flex",justifyContent:"center"}} className="row">
           <Square chooseSquare={()=>{handleSquareClick(0)}} val={board[0]} />
           <Square chooseSquare={()=>{handleSquareClick(1)}} val={board[1]}/>
           <Square chooseSquare={()=>{handleSquareClick(2)}} val={board[2]}/>
        </div>
       </div>
       <div style={{display:"flex",justifyContent:"center"}} className="row">
           <Square chooseSquare={()=>{handleSquareClick(3)}} val={board[3]}/>
           <Square chooseSquare={()=>{handleSquareClick(4)}} val={board[4]}/>
           <Square chooseSquare={()=>{handleSquareClick(5)}} val={board[5]}/>
        </div>
        <div style={{display:"flex",justifyContent:"center"}} className="row">
           <Square chooseSquare={()=>{handleSquareClick(6)}} val={board[6]}/>
           <Square chooseSquare={()=>{handleSquareClick(7)}} val={board[7]}/>
           <Square chooseSquare={()=>{handleSquareClick(8)}} val={board[8]}/>
        </div>
        <h1 style={{display:"flex",justifyContent:"center"}}>{getCookie("username")+" "+ points.you+" - "+points.rival+" "+rivalUsername}   </h1>
    </div>
  )
}
