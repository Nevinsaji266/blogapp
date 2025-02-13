import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { getHomeBlogsApi } from '../services/allApi'
import Blogcard from '../components/Blogcard'
import Header from '../components/Header'


function Home() {
    const [isLogin, setIsLogin] = useState(false)
    const [homeProject, setHomeProject] = useState([])

    const getHomeProject = async () => {
        const result = await getHomeBlogsApi()
        setHomeProject(result.data)
    }

    useEffect(() => {
        getHomeProject()
        if (sessionStorage.getItem("token")) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])

    return (
        <>
            <Header />
            <div
    className='py-10 d-flex justify-content-center align-items-center mb-5 mt-3'
    style={{
        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1684581214880-2043e5bc8b8b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '70vh'
    }}
>
    <div className='container text-center'>
        {/* Heading with Charcoal color */}
        <h1 style={{ color: '#333333' }} className='display-4 fw-bold mb-4'>Blog Application</h1>

        {/* Subheading with Dark Slate */}
        <h5 style={{ color: '#2F4F4F' }} className='mb-4'>
            Discover, create, and share amazing content with our easy-to-use blogging platform.
        </h5>

        <div className='d-flex justify-content-center mt-3'>
            {!isLogin ? (
                <Link to={'/login'}>
                    <button className='btn btn-success btn-lg px-4 py-2 rounded shadow'>
                        <span style={{ color: '' }}>Get Started</span> <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </Link>
            ) : (
                <Link to={'/dashboard'}>
                    <button className='btn btn-light btn-lg px-4 py-2 rounded shadow'>
                        <span className='bg-light'>Manage your account</span> <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </Link>
            )}
        </div>
    </div>
</div>





            <div className='my-10 mt-5 mb-5' style={{ backgroundColor: '' }}>
                <h4 className='text-center text-2xl font-semibold text-white mb-6'>Explore Our Blogs</h4>
                <div className='container'>
                    <div className='row gap-6 m-5'>
                        {homeProject?.map((item, index) => (
                            <div className="col-md-4 mb-6" key={index}>
                                <Blogcard blog={item} />
                            </div>
                        ))}
                    </div>
                    <Link to={'/projects'} className='text-center block mt-8'>
                        <p className='text-cyan-400 text-xl font-medium mt-4 mb-10 hover:underline hover:text-cyan-300 transition-all duration-300'>
                            See More Blogs <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                        </p>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Home;
