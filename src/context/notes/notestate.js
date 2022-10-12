import React from 'react'
import {useState} from 'react'
import noteContext from "./notecontext";

const Notestate=(props)=> {
  const host = "http://localhost:5000";
  const [notes,setNotes] = useState([]);
  const getnotes=async(token)=>{
    const response=await fetch(`${host}/api/note/getusernotes`,{
      method:'POST',
      headers : {
        "content":"application/json",
        "authtoken":token,
      }
    });
    const data = await response.json();
    setNotes(data);
  }
  const addnote=async(title,discription,tag,token)=>{
    const response=await fetch(`${host}/api/note/addnotes/${title}/${discription}/${tag}`,{
          method:'POST',
          headers : {
            "content":"application/json",
            "authtoken":token,
          }
        });
    const note = await response.json();
    console.log(note);
  setNotes(notes.concat(note));  
}
  const deletenote=async(id,token)=>{
        const response=await fetch(`${host}/api/note/deletenote/${id}`,{
          method:'DELETE',
          headers : {
            "content":"application/json",
            "authtoken":token,
          }
        });
        // const n1 = await response.json();
        // console.log(n1);
        const newNotes=notes.filter((note)=>{return note._id!==response._id});
        setNotes(newNotes);
        getnotes(token);
  }
  const editnote=async(id,title,discription,tag,token)=>{
        const response=await fetch(`${host}/api/note/updatenote/${id}/${title}/${discription}/${tag}`,{
          method:'PUT',
          headers : {
            "content":"application/json",
            "authtoken":token,
          },
        });
        const data = await response.json();
        console.log(data);
  }
  const Contactmessagesubmit=async(name,email,mobile,age,subject,message,token)=>{
        const response=await fetch(`${host}/api/message/submitmessage`,{
          method:'POST',
          headers : {
            "Content-Type":"application/json",
            "authtoken":token,
          },
          body:JSON.stringify({
            name:name,
            email:email,
            mobile:mobile,
            age:age,
            subject:subject,
            message:message
          })
        });
        const data = await response.json();
       return data;
  }
  
  return (
    <div>
        <noteContext.Provider value={{notes, addnote, getnotes, deletenote, editnote,Contactmessagesubmit}}>
          {props.children}
        </noteContext.Provider>
    </div>
  )
}

export default Notestate
