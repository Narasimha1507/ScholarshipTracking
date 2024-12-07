import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"; // Import CSS for styling
import Footer from './Footer';
import config from '../config';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false); // State for the success toast
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');  // State for message
    const [showFailureToast, setShowFailureToast] = useState(false); // State for the failure toast
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000);
            return;
        }

        // Check if all fields are filled
        if (!email || !newPassword || !confirmPassword) {
            setMessage('Please fill in all fields.');
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000);
            return;
        }

        try {
            // Make API call to update the password
            const response = await axios.post(`${config.url}/api/users/resetpassword`, {
                email,
                newPassword,
            });

            if (response.status === 200) {
                setShowToast(true); // Show the success toast
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page after the toast disappears
                    setShowToast(false); // Hide the toast after 3 seconds
                }, 2000);
            } else {
                setMessage('Failed to update the password. Please try again later.');
                setShowFailureToast(true); // Show the failure toast
                setTimeout(() => setShowFailureToast(false), 3000);
            }
        } catch (error) {
            setMessage('Enter the valid Email ID');
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false); // Close the success toast immediately
    };

    return (
        <div className='forgotpassword'>
            <div className="logincontainer">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <button className="button" type="submit">Change Password</button>
                </form>
                {/* Success Toast */}
                {showToast && (
                    <div className="toast-success">
                        Your password has been successfully updated.
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}
                {/* Failure Toast */}
                {showFailureToast && (
                    <div className="toast-failure">
                        {message}
                        <span className="close-toast" onClick={() => setShowFailureToast(false)}>&#10006;</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ForgotPassword;
