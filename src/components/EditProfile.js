// EditProfile.js

import React, { useState, useEffect } from 'react';
import './login.css'; // Using the same CSS as SignUp
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
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
        userType: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/users/profile?userId=${userId}`);
                    setFormData(response.data);
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

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:8080/api/users/profile`, { ...formData, id: userId });
            navigate('/profile'); // Redirect to Profile page after update
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Could not update profile");
        }
    };

    return (
        <div className='signup'>
            <div className="logincontainer">
                <h2>Edit Profile</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label>Aadhar Number:</label>
                    <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />

                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                    <label>Father's Name:</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />

                    <label>Father's Phone:</label>
                    <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />

                    <label>Mother's Name:</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />

                    <label>Mother's Phone:</label>
                    <input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} />

                    <label>College:</label>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} />

                    <label>CGPA:</label>
                    <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} />

                    <label>User Type:</label>
                    <input type="text" name="userType" value={formData.userType} onChange={handleChange} />

                    <button className="button" type="submit">Save Changes</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;
