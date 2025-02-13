import { faFacebook, faGithub, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div style={{ backgroundColor: "#060606", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Ensures no extra space between divs
            alignItems: "center",
            padding: "20px",
            flexWrap: "wrap",
            borderRadius: "0px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
            backgroundColor: "#1A2B3C",
            width: "100%"
          }}
        >
          {/* Column 1: Blog Info */}
          <div
            style={{
              border: "2px solid #E0E0E0",
              borderRadius: "0px", // Removed border-radius for a flush look
              padding: "20px",
              margin: "0", // Removed margin
              color: "#E0E0E0",
              textAlign: "center",
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#1A2B3C",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)",
              flex: "1",
              maxWidth: "33.33%" // Each column takes equal width
            }}
          >
            <div className='d-flex justify-content-center align-items-center'>
            <FontAwesomeIcon icon={faBlog} /> 
              <h5 style={{ fontSize: "24px", fontWeight: "bold" }}> Blog Space</h5>
            </div>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>Discover articles, tutorials, and updates in the world of blogging.</p>
          </div>

          {/* Column 2: Links */}
          <div
            style={{
              border: "2px solid #E0E0E0",
              borderRadius: "0px",
              padding: "20px",
              margin: "0",
              color: "#E0E0E0",
              textAlign: "center",
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#1A2B3C",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)",
              flex: "1",
              maxWidth: "33.33%"
            }}
          >
            <h5 style={{ fontSize: "22px", marginBottom: "10px" }}>Links</h5>
            <Link to={'/'} className='text-decoration-none' style={{ color: "#E0E0E0" }}><p style={{ fontSize: "16px" }}>Home</p></Link>
            <Link to={'/blogs'} className='text-decoration-none' style={{ color: "#E0E0E0" }}><p style={{ fontSize: "16px" }}>Blogs</p></Link>
            <Link to={'/about'} className='text-decoration-none' style={{ color: "#E0E0E0" }}><p style={{ fontSize: "16px" }}>About Us</p></Link>
          </div>

          {/* Column 3: Contact & Socials */}
          <div
            style={{
              border: "2px solid #E0E0E0",
              borderRadius: "0px",
              padding: "20px",
              margin: "0",
              color: "#E0E0E0",
              textAlign: "center",
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#1A2B3C",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)",
              flex: "1",
              maxWidth: "33.33%"
            }}
          >
            <h5 style={{ fontSize: "22px", marginBottom: "10px" }}>Contact Us</h5>
            <div className='d-flex justify-content-center'>
           
            </div>
            <div className='d-flex justify-content-around mt-3'>
              <FontAwesomeIcon icon={faXTwitter} className='text-light' />
              <FontAwesomeIcon icon={faLinkedin} className='text-light' />
              <FontAwesomeIcon icon={faFacebook} className='text-light' />
              <FontAwesomeIcon icon={faGithub} className='text-light' />
              <FontAwesomeIcon icon={faInstagram} className='text-light' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
