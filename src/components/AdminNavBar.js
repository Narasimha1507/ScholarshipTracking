import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

function AdminNavbar() {

    return (
        <nav className="navbar">
            <h2>Scholarship Management System</h2>
            <ul>
            <li><Link to="/adminhome">Home</Link></li>
                <li><Link to="/addscholarship">AddScholarships</Link></li>
                <li><Link to="/addstudent">AddStudent</Link></li>
                <li><Link to="/viewstudent">ViewStudent</Link></li>
                <li><Link to="/applications">Applications</Link></li>
                <li><Link to="/viewscholarship">ViewScholarship</Link></li>
                <li><Link to="/">LogOut</Link></li>
            </ul>
        </nav>
    );
}

export default AdminNavbar;
