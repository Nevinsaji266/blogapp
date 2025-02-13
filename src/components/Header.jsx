import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';


function Header() {
  const { setLoginResponse } = useContext(loginResponseContext)
  const [token,setToken]=useState('')
  const navigate=useNavigate()

  const handlelogout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate('/')
    setLoginResponse(false)
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }

  },[])
  return (
    <>
       <Navbar className='' style={{backgroundColor:"#1a1a1a   "}}>
        <Container>
          <Navbar.Brand >
          <h3 className='text-white'>  <FontAwesomeIcon icon={faBlog} /> BLOG SPACE</h3>
          </Navbar.Brand>
         { token && <button className='btn btn-success' onClick={handlelogout}><FontAwesomeIcon icon={faPowerOff} className='me-2 ' />Logout</button>}
        </Container>

      </Navbar>
    </>
  )
}

export default Header
