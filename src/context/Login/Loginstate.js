import {React, useState } from "react";
import Logincontext from "./Logincontext";
import { useNavigate } from "react-router-dom";
const Loginstate=(props)=>{
const Signin=async(name,email,password)=>{
    const response=await fetch(`http://localhost:5000/api/auth/signin/${name}/${email}/${password}`,{
        method:'POST',
        headers : {
            "content":"application/json",
            'Accept': 'application/json'
        },  
    })
    const nav=useNavigate();
      nav("/home");
       console.log(response.json());
}

const Loginuser=async(email,password)=>{
    console.log(email);
    console.log(password);
    const response=await fetch(`http://localhost:5000/api/auth/login/${email}/${password}`,{
        method:'POST',
        headers : {
         "content":"application/json",
         'Accept': 'application/json'
       },
    })
    const data=await response.json();
    console.log(data);
}

const Getuserdata=async()=>{
    const response=await fetch(`http://localhost:5000/api/auth/getuserdata`,{
        method:'POST',
        headers : {
         "content":"application/json",
         'Accept': 'application/json',
         "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMDUwMjc5ZjFlNjQ0YjRkNGMyOTJkIn0sImlhdCI6MTY1NTcyMjAyM30.2NfA1EFeeUSiI1z_IAvUx9bfwSUsMqxPEGc8JFfg3gQ"
       },  
    })
    const data=await response.json();
    console.log(data);
}

const Signout=async()=>{
    const response=await fetch(`http://localhost:5000/api/auth/signout`,{
        method:'POST',
        headers : {
         "content":"application/json",
         "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMDUwMjc5ZjFlNjQ0YjRkNGMyOTJkIn0sImlhdCI6MTY1NTcyMjAyM30.2NfA1EFeeUSiI1z_IAvUx9bfwSUsMqxPEGc8JFfg3gQ"
       },   
    })
    const data=await response.json();
    console.log(data);
}

    return(
        <Logincontext.Provider value={{Signin,Loginuser,Signout,Getuserdata}}>
            {props.children}
        </Logincontext.Provider>
    )
}

export default Loginstate;