import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateUserBlogApi } from '../services/allApi'
import { editResponseContext } from '../context/Contextshare'

function Edit({ blog }) {
    const { setEditResponse } = useContext(editResponseContext)
    const [key, setKey] = useState(1)
    const [blogDetails, setBlogDetails] = useState({
        title: blog.title,
        blogImage: "",
        overview: blog.overview
    })
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        handleCancel()
    }
    const handleShow = () => setShow(true)

    const handleFile = (e) => {
        setBlogDetails({ ...blogDetails, blogImage: e.target.files[0] })
    }

    const handleCancel = () => {
        setBlogDetails({
            title: blog.title,
            blogImage: "",
            overview: blog.overview
        })
        setPreview("")
        setKey(prevKey => prevKey === 1 ? 0 : 1)
    }

    const handleUpdate = async () => {
        const { title, overview } = blogDetails

        if (!title || !overview) {
            toast.info("Please fill the form completely")
        } else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("overview", overview)
            preview ? reqBody.append("blogImage", blogDetails.blogImage) : reqBody.append("blogImage", blog.blogImage)

            const token = sessionStorage.getItem("token")
            const reqHeaders = {
                "Content-Type": preview ? "multipart/form-data" : "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await updateUserBlogApi(blog._id, reqBody, reqHeaders)
            if (result.status === 200) {
                setEditResponse(result)
                toast.success("Updated successfully")
                setTimeout(() => {
                    handleClose()
                }, 2000)
            } else {
                handleCancel()
                toast.error("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (blogDetails.blogImage) {
            setPreview(URL.createObjectURL(blogDetails.blogImage))
        }
    }, [blogDetails.blogImage])

    return (
        <>
            <FontAwesomeIcon icon={faPenNib} className='me-md-3 me-2 text-info' onClick={handleShow} />
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title className='text-primary'>Edit Blog</Modal.Title> {/* Changed text color to primary */}
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="blogImage">
                                    <input id='blogImage' type="file" style={{ display: 'none' }} key={key} onChange={handleFile} />
                                    <img src={preview ? preview : `${serverUrl}/upload/${blog.blogImage}`} alt="Blog" height={300} className='w-100' />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <input 
                                    type="text" 
                                    className='w-100 form-control bg-light text-dark mb-2' 
                                    value={blogDetails.title} 
                                    onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })} 
                                    placeholder="Blog Title" 
                                    style={{ color: '#007bff' }} // Blue text color for the title input
                                />
                                <textarea 
                                    rows={5} 
                                    className='w-100 form-control bg-light mt-2 text-dark' 
                                    value={blogDetails.overview} 
                                    onChange={(e) => setBlogDetails({ ...blogDetails, overview: e.target.value })} 
                                    placeholder="Blog Overview"
                                    style={{ color: '#6c757d' }} // Gray text color for the overview textarea
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="warning" className='text-white' onClick={handleCancel}>Cancel</Button>
                    <Button variant="success" className='text-white' onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
                <ToastContainer theme="colored" position="top-center" autoClose={2000} />
            </Modal>
        </>
    )
}

export default Edit
