import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAllBlogsApi, getHomeBlogsApi } from '../services/allApi';
import Blogcard from '../components/Blogcard';

function Projects() {
  const [allprojects, setAllProjects] = useState([]);
  const [token, setToken] = useState('');
  const [searchkey, setSearchkey] = useState('');

  const getAllProjects = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        const result = await getAllBlogsApi(searchkey, reqHeaders);
        console.log('API Response:', result); // Check API response
        if (result && result.data) {
          setAllProjects(result.data);
        } else {
          setAllProjects([]); // Clear if no data
        }
      } catch (error) {
        console.error('API Error:', error); // Log API error
      }
    } else {
      console.log('No token found in sessionStorage');
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchkey]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const storedToken = sessionStorage.getItem('token');
      console.log('Token:', storedToken); // Check the token
      setToken(storedToken);
    }
  }, []);

  console.log('Search Key:', searchkey); // Check search input changes

  return (
    <>
      <Header />
      <div className="my-5">
        <h3 className="text-center">All Blogs</h3>

        {/* Conditional rendering based on token */}
        {!token ? (
          // Not logged in view
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="d-flex justify-content-center my-4">
                  <img src="/lock.webp" alt="lock" className="w-50" />
                </div>
                <h5 className="text-center">
                  Please
                  <Link to="/login" className="text-danger"> Login</Link> to Explore
                </h5>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        ) : (
          // Logged-in view
          <div>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4 d-flex">
                  <input
                    type="text"
                    className="form-control shadow-lg"
                    placeholder="Title"
                    onChange={(e) => setSearchkey(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ marginTop: '10px', marginLeft: '-30px' }}
                  />
                </div>
              </div>
            </div>

            {/* Project cards */}
            <div className="container-fluid mt-5">
              <div className="row">
                {allprojects.length > 0 ? (
                  allprojects.map((item, index) => (
                    <div className="col-md-3" key={index}>
                      {console.log('Blog Item:', item)} {/* Check each blog item */}
                      <Blogcard blog={item} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No Blogs found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;
