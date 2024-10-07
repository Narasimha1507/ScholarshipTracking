import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import './login.css';
import Footer from './Footer';

function Login({onStudentLogin}) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate successful authentication
        onStudentLogin();
        // Redirect to StudentHome
        navigate('/studenthome');
    };

    return (
        <div className='login'>
            <div className="logincontainer">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
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

                {/* Sign Up and Forgot Password Links */}
                <div className="login-links">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    <p><Link to="/forgot">Forgot Password?</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
