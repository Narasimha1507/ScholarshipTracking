import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import "./login.css"; // Import the CSS for styling
import Footer from './Footer';
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        aadhar: '',
        dob: '',
        fatherName: '',
        fatherPhone: '',
        motherName: '',
        motherPhone: '',
        college: '',
        cgpa: '',
        password: '',
        confirmPassword: '',
        userType: 'Student', // Default user type
    });
    const [showToast, setShowToast] = useState(false); // State for the success toast
    const [showFailureToast, setShowFailureToast] = useState(false); // State for the failure toast
    const[capVal,setCapVal] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide after 3 seconds
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', formData);
            if (response.status === 200) {
                setShowToast(true); // Show the success toast
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page after 3 seconds
                    setShowToast(false); // Hide the toast
                }, 2000);
                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    aadhar: '',
                    dob: '',
                    fatherName: '',
                    fatherPhone: '',
                    motherName: '',
                    motherPhone: '',
                    college: '',
                    cgpa: '',
                    password: '',
                    confirmPassword: '',
                    userType: 'Student',
                });
            }
        } catch (error) {
            console.error('There was an error signing up!', error);
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide after 3 seconds
        }
    };

    const handleCloseToast = () => {
        setShowToast(false); // Close the success toast immediately
        setShowFailureToast(false); // Close the failure toast immediately
    };

    return (
        <div className='signup'>
            <div className="logincontainer">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    
                    <label>Aadhar Number:</label>
                    <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} required />
                    
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    
                    <label>Father's Name:</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                    
                    <label>Father's Phone:</label>
                    <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} required />
                    
                    <label>Mother's Name:</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
                    
                    <label>Mother's Phone:</label>
                    <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} required />
                    
                    <label>College:</label>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} required />
                    
                    <label>CGPA:</label>
                    <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} required />

                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    <div className="captcha-container">
                    <ReCAPTCHA
                    sitekey="6Ler-pQqAAAAAMwkiNmowbgpCwr0MQ1zNff8VphA"
                    onChange={(val) => setCapVal(val)}
                    />
                    </div>
                    <button className="button" type="submit" disabled={!capVal}>Sign Up</button>
                </form>

                {/* Show green toast on successful signup */}
                {showToast && (
                    <div className="toast-success">
                        Sign up Successful!
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}

                {/* Show red toast on signup failure */}
                {showFailureToast && (
                    <div className="toast-failure">
                        Sign up Failed!<br/> The two passwords do not match.
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}

                {/* Link to Login */}
                <div className="login-links">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;
