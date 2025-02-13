import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

import Profile from '../components/Profile'
import MyBlog from '../components/Myblog'




function Dashboard() {
  const [username,setUsername]=useState('')

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }

  },[])
  console.log(username)


 
  return (
   
    <>
    <Header/>
    <div className='container  mt-5'>
      <h5>Welcome<span className='text-warning'> {username}</span></h5>
      <div className="row w-100 m-md-3 p-1 mb-5">
      <div className='col-md-2'></div>
        <div className="col-md-8">
          <Profile/>
        </div>
        <div className='col-md-2'></div>

      </div>
      <div className="row w-100 m-md-3 p-1 mt-5 mb-4">
      <div className='col-md-2'></div>
        <div className="col-md-8">
        <MyBlog/>
        </div>
        <div className='col-md-2'></div>

      </div>
     

    </div>
      
    </>
  )
}

export default Dashboard
