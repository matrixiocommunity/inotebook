import { useContext } from 'react';
import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/notecontext';
import Navbar from './Navbar'
const Contact=(props)=>{
  const nav=useNavigate();
  const token=JSON.parse(localStorage.getItem('token'));
  let {Contactmessagesubmit}=useContext(notecontext);
  useEffect(()=>{
    if(!token){
      nav("/")
    }
  })
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [mobile,setmobile]=useState("");
  const [age,setage]=useState("");
  const [subject,setsubject]=useState("");

  const handlesubmitmessage=async(event)=>{
    event.preventDefault();
    let message=document.getElementById('message1').value;
    const response=await Contactmessagesubmit(username,email,mobile,age,subject,message,token);
    console.log(response);
  }
  let {md,swst,func,tgst}=props;
  return (
    <div>
      {token && <Navbar md={md} swst={swst} func={func}/>}
      <section className="header headerimg">
      <div className="sub-header">
            <h1 style={tgst}>CONTACT US</h1>
        </div>
    </section>

    {/* <section className="map">
        <iframe className="map1"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d481.7000118634795!2d73.70528678369507!3d24.61734174674744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ab69358023%3A0xcc826fad6f884522!2sSuryodaya%20Colony%2C%20Pulla%20Bhuwana%2C%20Arihant%20Nagar%2C%20Bhuwana%2C%20Udaipur%2C%20Rajasthan%20313001!5e0!3m2!1sen!2sin!4v1629017393872!5m2!1sen!2sin"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </section> */}

    <section className="contactform">
        <div className="row">
        <div className="contact-col" style={{
    position: "relative",
    top: "-34px"
}}>
            <div className="contact-col-content">
                <i className="fa fa-home" aria-hidden="true"></i>
            <div>
             <h5 style={tgst}>H.NO.5,SURYODAY COLONY,BHUWANA</h5>
             <p style={tgst}>UDAIPUR,RAJASTHAN</p>
            </div>
        </div>
        <div className="contact-col-content">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <div>
             <h5 style={tgst}>+91 9829277695</h5>
             <p style={tgst}>monday to saturday,10:00a.m. - 3:00pm</p>
            </div>
            </div>
            <div className="contact-col-content">
                <i className="fa fa-envelope" aria-hidden="true"></i>
            <div>
             <h5 style={tgst}>info@sujalsahu0804@gmail.com</h5>
             <p style={tgst}>query us on email</p>
            </div>
            </div>
        </div>
        <div className="contact-col" style={tgst}>
            <form action="/contact" className="clientmessage" method="POST">
                <input type="text" className='input' style={md==="light"?swst:{}} name="name" id="name1" placeholder="ENTER YOUR NAME" onChange={(event)=>{event.preventDefault();setusername(event.target.value)}}/>
                <input type="email" className='input' style={md==="light"?swst:{}} name="email" id="email1" placeholder="ENTER YOUR EMAIL" onChange={(event)=>{event.preventDefault();setemail(event.target.value)}}/>
                <input type="text" className='input' style={md==="light"?swst:{}} name="number" id="number1" placeholder="ENTER YOUR PHONE NO." onChange={(event)=>{event.preventDefault();setmobile(event.target.value)}}/>
                <input type="text" className='input' style={md==="light"?swst:{}} name="age" id="age1" placeholder="ENTER YOUR AGE" onChange={(event)=>{event.preventDefault();setage(event.target.value)}}/>
                <input type="text" className='input' style={md==="light"?swst:{}} name="subject" id="subject1" placeholder="ENTER YOUR SUBJECT" onChange={(event)=>{event.preventDefault();setsubject(event.target.value)}}/>
                <textarea name="message" className='input' style={md==="light"?swst:{}} id="message1" rows="10" placeholder="ENTER YOUR MESSAGE"></textarea>
                <button type="submit" className="herobutton" onClick={handlesubmitmessage}>SEND MESSAGE</button>
            </form>
        </div>
        </div>
    </section>

    <section className="aboutus">
        <h3 style={tgst}>ABOUT US</h3>
        <p style={tgst}>
            Hii Guys, We are providing the service to save the notes and use it in future. It will help you to organize your works and use them for future reference.  You can store your notes here and use it in future. It is totally secure and faster way compared to others.
        </p>
    </section>

    <section className="footer" style={swst}>
        <p className="footerpara" style={swst}>Made with Love. Copyright<i className="fa fa-copyright" aria-hidden="true"></i> action
            reserved</p>
    </section>
    </div>
  )
}

export default Contact
