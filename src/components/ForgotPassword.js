import React, { useState } from 'react';
import "./login.css"; // Import CSS for styling
import Footer from './Footer';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate an API call for password reset
        if (email) {
            setMessage('A password reset link has been sent to your email.');
            // Here, you would typically call an API to handle the password reset logic
        } else {
            setMessage('Please enter your email address.');
        }
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
                    onChange={handleChange}
                    required
                />
                <label>New Password:</label>
                <input
                    type="password"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={email}
                    onChange={handleChange}
                    required
                />
            
                <button className="button" type="submit">Change Password</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
        <Footer/>
        </div>
    );
}

export default ForgotPassword;
