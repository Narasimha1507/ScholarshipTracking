import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/users/profile?userId=${userId}`);
                    setProfileData(response.data);
                } else {
                    setError("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Could not load profile data");
            }
        };
        fetchProfileData();
    }, []);

    const handleEditClick = () => {
        navigate('/editprofile');
    };

    const handleChangePasswordClick = () => {
        navigate('/changepassword');
    };

    return (
        <div className='studentprofile'>
            <div className="profile-container">
                <h2>User Profile</h2>
                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="profile-card">
                        <p><strong>Name:</strong> {profileData.name}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Phone:</strong> {profileData.phone}</p>
                        <p><strong>Aadhar:</strong> {profileData.aadhar}</p>
                        <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                        <p><strong>Father's Name:</strong> {profileData.fatherName}</p>
                        <p><strong>Father's Phone:</strong> {profileData.fatherPhone}</p>
                        <p><strong>Mother's Name:</strong> {profileData.motherName}</p>
                        <p><strong>Mother's Phone:</strong> {profileData.motherPhone}</p>
                        <p><strong>College:</strong> {profileData.college}</p>
                        <p><strong>CGPA:</strong> {profileData.cgpa}</p>
                        <p><strong>User Type:</strong> {profileData.userType}</p>
                        <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
                        <button onClick={handleChangePasswordClick} className="change-password-button">Change Password</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
