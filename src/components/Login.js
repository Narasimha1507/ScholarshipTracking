import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Footer from './Footer';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha"
//6Ler-pQqAAAAAMwkiNmowbgpCwr0MQ1zNff8VphA

function Login({ onStudentLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); // State for the success toast
    const [showFailureToast, setShowFailureToast] = useState(false); // State for the failure toast
    const[capVal,setCapVal] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);

            if (response.data.success) { // Check for success field in response
                onStudentLogin();
                // Store user ID and email in local storage for further use
                localStorage.setItem('userId', response.data.userId);
                setShowToast(true); // Show the success toast
                setTimeout(() => {
                    navigate('/studenthome'); // Navigate to the home page after the toast disappears
                    setShowToast(false); // Hide the toast after 3 seconds
                }, 2000);
            } else {
                setError('Invalid email or password');
                setShowFailureToast(true); // Show the failure toast
                setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('An error occurred. Please try again.');
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
        }
    };

    const handleCloseToast = () => {
        setShowToast(false); // Close the success toast immediately
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
                    <div className="captcha-container">
                    <ReCAPTCHA
                    sitekey="6Ler-pQqAAAAAMwkiNmowbgpCwr0MQ1zNff8VphA"
                    onChange={(val) => setCapVal(val)}
                    />
                    </div>
                    <button className="button" type="submit" disabled={!capVal}>Login</button>
                </form>

                {/* Show green toast on successful login */}
                {showToast && (
                    <div className="toast-success">
                        Login Successful!
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
