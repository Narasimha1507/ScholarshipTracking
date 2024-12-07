import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./changepassword.css"; // Import the same CSS as SignUp
import Footer from './Footer'; // Assuming Footer is used in both

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.put('http://localhost:8080/api/users/changepassword', {
                userId,
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                alert('Password updated successfully!');
                navigate('/profile');
            }
        } catch (error) {
            setError('Failed to change password!');
        }
    };

    return (
        <div className="changepassword">
            <div className="changepasswordcontainer">
                <h2>Change Password</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className='button' type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default ChangePassword;
