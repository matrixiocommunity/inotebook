import React, { useEffect,useContext,useRef, useState  } from 'react'
import notecontext from '../context/notes/notecontext'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Noteitem from './noteitem';

const Profile=(props)=>{
  const {notes,addnote,getnotes,editnote,deletenote} = useContext(notecontext);
  const nav=useNavigate();
  const token=JSON.parse(localStorage.getItem('token'));
  const launchdemo=useRef(null);
  const [note1,setNote1]=useState({id:"",etitle:"",ediscription:"",etag:"default"});
  useEffect(()=>{
    if(!token){
      nav("/")
    }
  })
  const a=useContext(notecontext);
  let {md,swst,func,tgst}=props;
  const updatenote=(currnote)=>{
    launchdemo.current.click();
     setNote1({id:currnote._id,etitle:currnote.title,ediscription:currnote.discription,etag:currnote.tag});
}
  return (
    <div>
      {token && <Navbar md={props.md} swst={props.swst} func={props.func}/>}
      <div className="container my-3">
            <h2 className="my-3" style={tgst}>Your Notes</h2>
            <div className="row">
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note} deletenote={deletenote} getnotes={getnotes} updatenote={updatenote} tgst={tgst} md={md}/>
            })}
            
            </div>
      </div>
    </div>
  )
}

export default Profile
