import { React, useState } from 'react'
import Logincontext from '../context/Login/Logincontext.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
function Login(props) {
  useEffect(() => {
    localStorage.clear();
  }, [])
  const nav = useNavigate();
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  // const {Loginuser,Signin}=useContext(Logincontext);
  const [loginaction, setloginaction] = useState(true);
  const update = (e) => {
    e.preventDefault();
    setuser({ ...user, [e.target.name]: e.target.value });
  }
  const handleloginaction = () => {
    setloginaction(true);
  }
  const handlesignupaction = () => {
    setloginaction(false);
  }
  const handlesignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup/${user.name}/${user.email}/${user.password}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
    })
    const data = await response.json();
    console.log(data);
    // if(data.error){
    //      nav("/");
    //      return;
    // }
    // else{
    //       localStorage.setItem('token',JSON.stringify(data.authtoken));
    //       nav("/home");
    // }
    if (data.authtoken) {
      localStorage.setItem('token', JSON.stringify(data.authtoken));
      nav("/home");
    }
    else {
      document.getElementById("error1").style.display = "block";
      setTimeout(() => {
        document.getElementById("error1").style.display = "none";
      }, 3000);
    }
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login/${user.email}/${user.password}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
    })
    const data = await response.json();
    console.log(data);
    //     if(data.error){
    //       nav("/");
    //       return;
    //  }
    //  else{
    //        localStorage.setItem('token',JSON.stringify(data.authtoken));
    //        nav("/home");
    //  }
    if (data.authtoken) {
      localStorage.setItem('token', JSON.stringify(data.authtoken));
      nav("/home");
    }
    else {
      document.getElementById("error1").style.display = "block";
      setTimeout(() => {
        document.getElementById("error1").style.display = "none";
      }, 3000);
    }
  }
  let { md } = props;
  return (
    <div style={{
      position: "absolute",
      width: "100%",
      top: "26%"
    }}>
      <div class="alert alert-primary" role="alert" id="error1" style={{ position: "fixed", top: "0px", width: "100%", textAlign: "center", display: "none" }}>
        Error! Please Enter the Correct Credentials........
      </div>
      <div className="container my-3" id="mainform">
        <div className='container mx-7 my-5 su'>
          <button type="button" style={{ background: "white", color: "black", border: "none" }} onClick={handleloginaction}>Login |</button>
          <button type="button" style={{ background: "white", color: "black", border: "none" }} onClick={handlesignupaction}>SignUp</button>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" name="name" id="name" placeholder='Enter Your Username' onChange={update} minLength={5} required />
          <label htmlFor="floatingInput" style={{ color: "black" }}>User Name</label>
        </div>
        <div className="form-floating">
          <input type="text" className="form-control" name="email" id="email" placeholder='Enter Your Email' value={user.email} onChange={update} />
          <label htmlFor="floatingEmail" style={{ color: "black" }}>Email</label>
        </div>
        <div className="form-floating my-3">
          <input type="text" className="form-control" name="password" id="password" placeholder='Enter Your Password' value={user.password} onChange={update} minLength={5} required />
          <label htmlFor="floatingPassword" style={{ color: "black" }}>Password</label>
        </div>
        <button type="submit" disabled={user.name.length <= 5 || user.password.length <= 5} className="btn btn-primary my-3" style={{ display: "block", margin: "auto" }} onClick={loginaction ? handlelogin : handlesignup}>{loginaction ? `Login` : `SignUp`}</button>
      </div>
    </div>
  )
}

export default Login
