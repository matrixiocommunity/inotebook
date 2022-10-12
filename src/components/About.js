import React, { useEffect,useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import aboutimg from '../images/about.jpg'
const About=(props)=>{
  const nav=useNavigate();
  const token=JSON.parse(localStorage.getItem('token'));
  useEffect(()=>{
    if(!token){
      nav("/")
    }
  })
  const a=useContext(notecontext);
  let {md,swst,func,tgst}=props;
  return (
    <div>
      {token && <Navbar md={props.md} swst={props.swst} func={props.func}/>}
      <div class="scontainer-fluid spy-5">
            <div class="scontainer">
                <div class="srow salign-items-center spb-1">
                    <div class="scol-lg-5 ">
                        <img class="simg-thumbnail sp-3 abtimg" src={aboutimg} alt=""/>
                    </div>
                    <div class="scol-lg-7 smt-5 smt-lg-0">
                        <h1 class="smt-2 smb-4">How does it work?</h1>
                        <p class="smb-4">This is the website designed to manage your notes at one platform. You can easily Login/Sign up to our website and can store your notes and edit it. We can perform many operation on our notes. It is totally secure and easy. So you are the right place if you are thinking about organizing your notes and want to save it!</p>
                        <a href="/" class="btn btn-primary" style={{padding: "2%",margin:"2% 8%"}}>Let's begin</a>
                    </div>
                </div>
               
            </div>
        </div>
        <section className="footer" style={swst}>
        <p className="footerpara" style={swst}>Made by sujal web development company. Copyright<i className="fa fa-copyright" aria-hidden="true"></i> action
            reserved</p>
    </section>
    </div>
  )
}

export default About
