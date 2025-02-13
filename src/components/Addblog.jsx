import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadBlogApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function AddBlog() {
    const { setAddResponse } = useContext(addResponseContext);
    const [preview, setPreview] = useState('');
    const [token, setToken] = useState('');
    const [key, setKey] = useState(1);
    const [show, setShow] = useState(false);

    const [blogDetails, setBlogDetails] = useState({
        title: '',
        overview: '',
        blogImage: ''
    });

    const handleUpload = async () => {
        const { title, overview, blogImage } = blogDetails;
        if (!title || !overview || !blogImage) {
            toast.info("Please fill the form completely");
        } else {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("overview", overview);
            reqBody.append("blogImage", blogImage);

            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };
                const result = await uploadBlogApi(reqBody, reqHeader);
                console.log(result);
                if (result.status === 200) {
                    toast.success("Blog added successfully");
                    setTimeout(() => {
                        handleClose();
                    }, 2000);
                    setAddResponse(result);
                } else if (result.status === 406) {
                    toast.warning(result.response.data);
                    handleCancel();
                } else {
                    toast.error("Something went wrong");
                    handleClose();
                }
            } else {
                toast.warning("Please login");
            }
        }
    };

    const handleCancel = () => {
        setBlogDetails({
            title: '',
            overview: '',
            blogImage: ''
        });
        setPreview('');
        setKey(prevKey => prevKey === 1 ? 0 : 1);
    };

    const handleClose = () => {
        setShow(false);
        handleCancel();
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        if (blogDetails.blogImage) {
            setPreview(URL.createObjectURL(blogDetails.blogImage));
        }
    }, [blogDetails.blogImage]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <>
            <div>
                <button className='btn btn-success' onClick={handleShow}>Add Blog</button>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title className='text-success'>Add Blog</Modal.Title> {/* Title with primary color */}
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="blogImage" className='text-secondary fw-bold'> {/* Label styled with secondary text */}
                                    Upload Image:
                                    <input id='blogImage' type="file" style={{ display: 'none' }} key={key} onChange={(e) => setBlogDetails({ ...blogDetails, blogImage: e.target.files[0] })} />
                                    <img src={preview ? preview : "/addproject.png"} alt="Blog Preview" height={300} className='w-100 mt-2' />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <input 
                                    type="text" 
                                    className='w-100 form-control bg-light text-dark mb-2' 
                                    placeholder='Title' 
                                    onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })} 
                                    value={blogDetails.title} 
                                    style={{ color: '#007bff' }} // Blue text color for title
                                />
                                <textarea 
                                    rows={5} 
                                    className='w-100 form-control bg-light mt-2 text-dark' 
                                    placeholder='Overview' 
                                    onChange={(e) => setBlogDetails({ ...blogDetails, overview: e.target.value })} 
                                    value={blogDetails.overview}
                                    style={{ color: '#6c757d' }} // Gray text color for overview
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="warning" className='text-white' onClick={handleCancel}>Cancel</Button> {/* Button with white text */}
                    <Button variant="success" className='text-white' onClick={handleUpload}>Upload</Button> {/* Button with white text */}
                </Modal.Footer>
                <ToastContainer theme="colored" position="top-center" autoClose={2000} />
            </Modal>
        </>
    );
}

export default AddBlog;
