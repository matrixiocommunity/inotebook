import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import notecontext from '../context/notes/notecontext';
import Noteitem from './noteitem';
import Notes from './notes';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const Home=(props)=> {
  const nav=useNavigate();
  // useEffect(()=>{
  //     window.location.reload();
  // },[])
  const token=JSON.parse(localStorage.getItem('token'));
  useEffect(()=>{
    if(!token){
      nav("/")
    }
  })
  const notes = useContext(notecontext);
  let {md,swst,func,tgst}=props;
  return (
      <div>
       {token && <Navbar md={md} swst={swst} func={func}/>}
       <Notes tgst={tgst} md={md}/>
       {/* <section className="footer" style={swst}>
        <p className="footerparaforhome" style={swst}>Made by sujal web development company. Copyright<i className="fa fa-copyright" aria-hidden="true"></i> action
            reserved</p>
    </section> */}
    </div>
  )
}

export default Home
