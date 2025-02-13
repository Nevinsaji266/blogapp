import React, { useContext, useEffect, useState } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBlog from './Addblog';
import Edit from './Edit';
import { deleteUserBlogApi, getUserBlogsApi } from '../services/allApi';
import { addResponseContext, editResponseContext } from '../context/Contextshare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyBlog() {
  const { editResponse } = useContext(editResponseContext);
  const { addResponse } = useContext(addResponseContext);
  const [userBlogs, setUserBlogs] = useState([]);
  
  // Fetch user blogs
  const getUserBlogs = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await getUserBlogsApi(reqHeaders);
        if (result.status === 200) {
          setUserBlogs(result.data);
        } else {
          toast.error("Failed to fetch blogs.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("An error occurred while fetching blogs.");
      }
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await deleteUserBlogApi(id, reqHeaders);
          console.log("Delete Response:", result); // Log the full response for debugging
  
          if (result.status === 200) {
            toast.success("Blog removed successfully");
            setUserBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
          } else {
            toast.error(`Failed to delete blog. Status: ${result.status}`);
          }
        } catch (error) {
          console.error("Error deleting blog:", error); // Log the error to the console
          toast.error("An error occurred while deleting the blog.");
        }
      }
    }
  };
  

  // Fetch blogs when component mounts or when there's an update
  useEffect(() => {
    getUserBlogs();
  }, [addResponse, editResponse]);

  return (
    <>
      <div className='d-flex justify-content-between p-md-3 p-2 align-items-center'>
        <h4 className='text-success'>My Blogs</h4>
        <AddBlog />
      </div>

      {/* Display Blogs */}
      {userBlogs.length > 0 ? (
        userBlogs.map(item => (
          <div key={item._id} className='px-md-5 p-5 p-md-3 bg-light rounded-3 d-flex justify-content-between my-2'>
            <h5>{item.title}</h5>
            <div className='fa-xl'>
              <Edit blog={item} />
              <FontAwesomeIcon 
                icon={faTrashCan} 
                className='me-md-3 me-2 text-danger' 
                onClick={() => handleDelete(item._id)} 
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        ))
      ) : (
        <h6 className='text-center text-warning mt-5'>No blog added yet</h6>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default MyBlog;
