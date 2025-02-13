import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faBackward, faBlog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'

function Auth({ register }) {
  const { setLoginResponse } = useContext(loginResponseContext)
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleregister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("Please fill the form completely")
    } else {
      const result = await registerApi(userDetails)
      console.log(result)
      if (result.status === 200) {
        toast.success('Registration successful')
        setUserDetails({
          username: '',
          email: '',
          password: ''
        })
        navigate('/login')
      } else if (result.status === 406) {
        toast.warning(result.response.data)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  const handlelogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Please fill the form completely")
    } else {
      const result = await loginApi(userDetails)
      console.log(result)

      if (result.status === 200) {
        setLoginResponse(true)
        toast.success("Login successful")

        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setUserDetails({
          username: '',
          email: '',
          password: ''
        })

        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else if (result.status === 406) {
        toast.warning(result.response.data)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <>
      <div className='container my-5' style={{ backgroundImage: "url('https://love2justice.wordpress.com/wp-content/uploads/2012/02/blog-background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Link to={'/'} className='text-decoration-none'>
          <h5 className='text-success'>
            <FontAwesomeIcon icon={faBackward} /> Back to Home
          </h5>
        </Link>
        <div className='row' style={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src="/login.png" alt="Login Illustration" />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white">
            <div className='d-flex fs-5'>
              <h1>
              <FontAwesomeIcon icon={faBlog} className='me-2' />
                Blog Space
              </h1>
            </div>

            {!register ? <h5 className='my-3'>Sign In to Your Account</h5>
              : <h5 className='my-3'>Sign Up for a New Account</h5>}

            {register && <input type="text" className='form-control w-75' placeholder='Username' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} />}
            <input type="text" className='form-control w-75 mt-3' placeholder='E-mail ID' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email} />
            <input type="password" className='form-control w-75 mt-3' placeholder='Password' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} />

            {!register ?
              <div>
                <button className='btn btn-success w-100 mt-4' onClick={handlelogin} style={{ height: '3rem' }}>Login</button>
                <h5 className='mt-3'>New User? Click Here to <Link to={'/register'} className='text-danger'>Register</Link></h5>
              </div>
              :
              <div>
                <button className='btn btn-success w-100 mt-4' style={{ height: '3rem' }} onClick={handleregister}>Register</button>
                <h5 className='mt-3'>Already a User? Click Here to <Link to={'/login'} className='text-danger'>Login</Link></h5>
              </div>
            }

          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  )
}

export default Auth;