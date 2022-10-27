import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Link
 } from "react-router-dom";
const Navbar=(props)=>{
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname);
    }, [location]);
    let {swst,md,func} = props;
  return (   
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${md} bg-${md}`}>
      <div className="container-fluid">
      <Link className="navbar-brand" to="/home">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} to="/contact">Contact</Link>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
         <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div className="form-check form-switch mx-3">
                    <input className="form-check-input" type="checkbox" role="switch" onClick={func} id="flexSwitchCheckDefault"/>
                    <label className="form-check-label darkbg" htmlFor="flexSwitchCheckDefault" style={swst}>Enable Dark Mode</label>
                  </div>
        <Link className={`nav-link ${location.pathname==="/profile"?"active":""}`} to="/profile">Profile</Link>
       </div>
      </div>
           </nav>
    </div>
  )
}

export default Navbar
