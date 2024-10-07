import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import Footer from './Footer';

function Profile() {
    const [profileData, setProfileData] = useState({
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
        userType: 'Student',
    });

    useEffect(() => {
        // Assuming you fetch the student profile data from an API
        // Here you can replace the hardcoded values with the fetched data
        setProfileData({
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '9876543210',
            aadhar: '1234-5678-9101',
            dob: '2001-01-15',
            fatherName: 'Mr. Doe',
            fatherPhone: '9876543211',
            motherName: 'Mrs. Doe',
            motherPhone: '9876543212',
            college: 'ABC University',
            cgpa: '8.9',
            userType: 'Student',
        });
    }, []);

    return (
        <div className='studentprofile'>
        <div className="profile-container">
            <h2>Student Profile</h2>
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
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Profile;
