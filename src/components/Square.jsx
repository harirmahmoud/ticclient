import React from 'react'

export default function Square({chooseSquare,val}) {
  return (
    <div onClick={chooseSquare} style={{
        width:"100px",
        height:"100px",
        border:"1px solid black",
        borderRadius:"5px",
        hover:{
            backgroundColor:"lightblue"
        },
        margin:"10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        }}>
        {val}
        </div>
  )
}
