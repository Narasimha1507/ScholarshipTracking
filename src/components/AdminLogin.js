import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';
import Footer from './Footer';
import axios from 'axios';
import config from '../config';

function AdminLogin({ onAdminLogin }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showSuccessToast, setShowSuccessToast] = useState(false); // State for success toast
    const [showFailureToast, setShowFailureToast] = useState(false); // State for failure toast
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${config.url}/api/admin/login`, formData);
            
            if (response.status === 200) {
                onAdminLogin();
                setShowSuccessToast(true); // Show the success toast
                setTimeout(() => {
                    navigate('/adminhome'); // Navigate to the admin home page after the toast disappears
                    setShowSuccessToast(false); // Hide the toast after navigating
                }, 2000);
            } else {
                setError('Invalid credentials');
                setShowFailureToast(true); // Show the failure toast
                setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please try again.');
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
        }
    };

    const handleCloseToast = () => {
        setShowSuccessToast(false); // Close the success toast immediately
    };

    return (
        <div className='login'>
            <div className="logincontainer">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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

                {/* Show green toast on successful login */}
                {showSuccessToast && (
                    <div className="toast-success">
                        Admin Login Successful!
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}

                {/* Show red toast on login failure */}
                {showFailureToast && (
                    <div className="toast-failure">
                        Login Failed! {error}
                        <span className="close-toast" onClick={() => setShowFailureToast(false)}>&#10006;</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AdminLogin;
