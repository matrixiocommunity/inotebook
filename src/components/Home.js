import React, { useContext, useEffect, useState } from 'react'
import notecontext from '../context/notes/notecontext';
import Noteitem from './noteitem';
import Notes from './notes';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
  //? useNavigate
  const nav = useNavigate();

  //? contexts
  const notes = useContext(notecontext);

  //? Variables
  let { md, swst, func, tgst } = props;
  const token = JSON.parse(localStorage.getItem('token'));

  //? useStates
  const [searchText, setSearchText] = useState('')

  //? useEffects
  useEffect(() => {
    if (!token) {
      nav("/")
    }
  })

  // useEffect(()=>{
  //     window.location.reload();
  // },[])
  return (
    <div>
      {token && <Navbar searchText={searchText} setSearchText={setSearchText} md={md} swst={swst} func={func} />}
      <Notes searchText={searchText} tgst={tgst} md={md} />
      {/* <section className="footer" style={swst}>
        <p className="footerparaforhome" style={swst}>Made by sujal web development company. Copyright<i className="fa fa-copyright" aria-hidden="true"></i> action
            reserved</p>
    </section> */}
    </div>
  )
}

export default Home
