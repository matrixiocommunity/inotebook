import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
// import notecontext from '../context/notes/notecontext';
const Noteitem = (props) => {
    const {note,updatenote,deletenote} = props;
    const token=JSON.parse(localStorage.getItem('token'));
    let tgst=props.tgst;
  return (
    <>
       <div className="col-md-3 my-3" style={tgst}>
       <div className="card" style={{width: "18rem"}}>
         <div className="card-body" style={tgst}>
           <div className="d-flex align-items-center">
           <h5 className="card-title widthst" style={tgst}>{note.title}</h5>
           <i className="fa-solid fa-pen-to-square mx-3 a" style={props.md==="light"?{color:"white"}:{}} onClick={()=>{updatenote(note)}}/>
           <i className="fa-solid fa-trash mx-3 a" style={props.md==="light"?{color:"white"}:{}} onClick={()=>{deletenote(note._id,token)}}></i>
           </div>
           <p className="card-text" style={tgst}>{note.discription}</p>
           <p className="tag" style={tgst}>~{note.tag}</p>
           {/* <a href="/" className="btn btn-primary">Submit</a> */}
         </div>
         
       </div>
       </div>
       
    </>
  )
}

export default Noteitem
