import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
    const navigate = useNavigate();

    // Function to handle About Us click and navigate to the section
    const handleAboutUsClick = () => {
        navigate('/#aboutus');
        window.location.reload(); // Navigate to Home and scroll to #aboutus section
    };

    return (
        <nav className="navbar">
            <h2>Scholarship Management System</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link onClick={handleAboutUsClick} className="nav-button">About Us</Link></li> {/* Trigger scroll on click */}
                <li><Link to="/scholarships">Scholarships</Link></li>
                <li><Link to="/contactus">Contact Us</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
