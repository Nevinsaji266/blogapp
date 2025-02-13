import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateuserprofileApi } from '../services/allApi';

function Profile() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        profile: ""
    });
    const [updateStatus, setUpdateStatus] = useState('');
    const [preview, setPreview] = useState("");
    const [existingImg, setExistingImg] = useState('');

    const handleFile = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] });
    };

    const handleUpdate = async () => {
        const { username, email, password, profile } = userDetails;

        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("email", email);
        reqBody.append("password", password);
        preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImg);

        const token = sessionStorage.getItem("token");
        const reqHeaders = {
            "Content-Type": preview ? "multipart/form-data" : "application/json",
            "Authorization": `Bearer ${token}`
        };

        const result = await updateuserprofileApi(reqBody, reqHeaders);
        console.log(result);
        if (result.status === 200) {
            toast.success("Profile updated successfully");
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));
            setUpdateStatus(result);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"));
            setUserDetails({ 
                username: user.username, 
                email: user.email, 
                password: user.password 
            });
            setExistingImg(user.profile);
        }
    }, [updateStatus]);

    useEffect(() => {
        if (userDetails.profile) {
            setPreview(URL.createObjectURL(userDetails.profile));
        }
    }, [userDetails.profile]);

    return (
        <>
            <div className='shadow p-4' style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h4 className='text-success text-center mb-4'>Profile</h4>
                <div className='d-flex justify-content-center'>
                    <label htmlFor="profileimage">
                        <input type="file" id='profileimage' style={{ display: 'none' }} onChange={handleFile} />
                        <img 
                            src={preview || (existingImg ? `${serverUrl}/upload/${existingImg}` : "/profile.png")} 
                            alt="Profile" 
                            className='rounded-circle' 
                            width={150} 
                            height={150} 
                        />
                    </label>
                </div>
                <input 
                    type="text" 
                    className='form-control mt-4' 
                    placeholder='Username' 
                    value={userDetails.username} 
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} 
                />
                <input 
                    type="email" 
                    className='form-control mt-2' 
                    placeholder='Email' 
                    value={userDetails.email} 
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} 
                />
                <button className='btn btn-success w-100 mt-4' onClick={handleUpdate}>Update</button>
            </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />
        </>
    );
}

export default Profile;
