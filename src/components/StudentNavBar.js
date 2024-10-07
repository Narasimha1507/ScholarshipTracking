import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

function StudentNavbar() {

    return (
        <nav className="navbar">
            <h2>Scholarship Management System</h2>
            <ul>
            <li><Link to="/studenthome">Home</Link></li>
                <li><Link to="/studentscholarship">Scholarships</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/">LogOut</Link></li>
            </ul>
        </nav>
    );
}

export default StudentNavbar;
