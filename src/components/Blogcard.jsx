import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../services/serverUrl';

function Blogcard({ blog }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Debugging: Log the blog data to see what is being passed
    console.log('Blog Data:', blog);

    return (
        <>
            <Card 
                className='w-100 mt-5 mt-md-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer' 
                onClick={handleShow}
            >
                <Card.Img 
                    variant="top" 
                    src={blog.blogImage ? `${serverUrl}/upload/${blog.blogImage}` : '/placeholder.jpg'} 
                    height={280} 
                    className='object-cover rounded-t-2xl' 
                />
                <Card.Body className='rounded-b-2xl text-center p-3'>
                    <Card.Title className='text-xl font-semibold'>
                        {blog.title || 'Untitled'}
                    </Card.Title>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl font-bold'>{blog.title || 'Untitled'}</Modal.Title>
                </Modal.Header>
                <div className="container-fluid p-4">
                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <img 
                                src={blog.blogImage ? `${serverUrl}/upload/${blog.blogImage}` : '/placeholder.jpg'} 
                                alt="Project" 
                                className='w-100 rounded-lg object-cover' 
                                height={330}
                            />
                        </div>
                        <div className="col-md-6">
                            <h4 className='text-lg font-semibold mb-2'>Description</h4>
                            <p className='text-base mb-3'>{blog.overview || 'No description provided.'}</p>
                        </div>
                    </div>
                </div>
                <Modal.Footer className='flex justify-start gap-4 p-3'>
                    {/* Footer content if needed */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Blogcard;
