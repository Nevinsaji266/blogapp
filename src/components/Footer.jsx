import { faFacebook, faGithub, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-[#060606] w-full">
      <div className="flex flex-wrap justify-between items-center p-5 bg-[#1A2B3C] shadow-md w-full">
        {/* Column 1: Blog Info */}
        <div className="border border-gray-300 p-5 text-center text-gray-300 flex flex-col items-center justify-center bg-[#1A2B3C] shadow-md flex-1 max-w-full sm:max-w-[33.33%]">
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faBlog} className="mr-2" /> 
            <h5 className="text-xl font-bold">Blog Space</h5>
          </div>
          <p className="text-sm mt-2">Discover articles, tutorials, and updates in the world of blogging.</p>
        </div>

        {/* Column 2: Links */}
        <div className="border border-gray-300 p-5 text-center text-gray-300 flex flex-col items-center justify-center bg-[#1A2B3C] shadow-md flex-1 max-w-full sm:max-w-[33.33%]">
          <h5 className="text-lg mb-2">Links</h5>
          <Link to={'/'} className='text-gray-300 text-sm hover:underline'>Home</Link>
          <Link to={'/blogs'} className='text-gray-300 text-sm hover:underline'>Blogs</Link>
          <Link to={'/about'} className='text-gray-300 text-sm hover:underline'>About Us</Link>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="border border-gray-300 p-5 text-center text-gray-300 flex flex-col items-center justify-center bg-[#1A2B3C] shadow-md flex-1 max-w-full sm:max-w-[33.33%]">
          <h5 className="text-lg mb-2">Contact Us</h5>
          <div className='flex flex-col sm:flex-row justify-center items-center w-full'>
            <input type="text" className='form-control p-2 rounded-md text-black w-full sm:w-auto mb-2 sm:mb-0' placeholder='Email address' />
            <button className='bg-green-600 text-white p-2 rounded-md sm:ml-2 w-full sm:w-auto'>Subscribe</button>
          </div>
          <div className='flex justify-around w-full mt-3'>
            <FontAwesomeIcon icon={faXTwitter} className='text-light cursor-pointer hover:text-gray-400' />
            <FontAwesomeIcon icon={faLinkedin} className='text-light cursor-pointer hover:text-gray-400' />
            <FontAwesomeIcon icon={faFacebook} className='text-light cursor-pointer hover:text-gray-400' />
            <FontAwesomeIcon icon={faGithub} className='text-light cursor-pointer hover:text-gray-400' />
            <FontAwesomeIcon icon={faInstagram} className='text-light cursor-pointer hover:text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
