import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import './adminlogin.css';
import Footer from './Footer';

function AdminLogin({onAdminLogin}) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate successful authentication
        alert('Logged in successfully!');
        onAdminLogin();
        // Redirect to StudentHome
        navigate('/adminhome');
    };

    return (
        <div className='login'>
            <div className="logincontainer">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="text"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="button" type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AdminLogin;
