import {React,useState} from 'react'
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import About from './components/About'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Notestate from './context/notes/notestate';
import Profile from './components/Profile';



function App(){
  const token=JSON.parse(localStorage.getItem('token'));
  const [mode,setmode]=useState("dark");
  const [togglestyle,settogglestyle] = useState({
    background:"white",
    color:"black"
  })
  const [switchst,setswitchst]=useState({color:"white",
  background:"#212529"})
  const togglecolor =()=>{
    if(mode==="dark"){
      settogglestyle({  
        background:"black",
        color:"white"
      })
      setmode("light");
      setswitchst({
        color:"#212529",
        background:"white"
      })
      document.body.style.background = "black";
      document.body.style.color = "white";
    }
    else{
      settogglestyle({
        background:"white",
       color:"black"
      })
      setmode("dark");
      setswitchst({
        color:"white",
        background:"#212529"
      })
     document.body.style.background = "white";
     document.body.style.color = "black";
    }
  }
  return (
    <>
    <Notestate>
      <Router>
     
      <Routes>
          <Route exact path="/" element = {<Login/>}></Route>
          <Route exact path="/home" element = {<Home md={mode} swst={switchst} func={togglecolor} tgst={togglestyle}/>}></Route>
          <Route exact path="/contact" element={<Contact md={mode} swst={switchst} func={togglecolor} tgst={togglestyle}/>}></Route>
          <Route exact path="/about" element={<About md={mode} swst={switchst} func={togglecolor} tgst={togglestyle}/>}></Route>
          <Route exact path="/profile" element={<Profile md={mode} swst={switchst} func={togglecolor} tgst={togglestyle}/>}></Route>
      </Routes>
      </Router>
      </Notestate>
    </>
  );
}

export default App;
