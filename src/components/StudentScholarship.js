import React, { useState, useEffect } from 'react';
import './scholarshiplist.css';
import Footer from './Footer';
import axios from 'axios';
import config from '../config';

function ScholarshipList() {
    const [scholarships, setScholarships] = useState([]);
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Fetch scholarships from the backend API
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get(`${config.url}/api/scholarships/all`);
                setScholarships(response.data);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
                setToastMessage("Failed to load scholarships.");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        };
        fetchScholarships();
    }, []);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
                if (userId) {
                    const response = await axios.get(`${config.url}/api/users/profile?userId=${userId}`);
                    setUserData(response.data);
                } else {
                    setError("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Could not load user data.");
            }
        };
        fetchUserData();
    }, []);

    // Function to handle the Apply Now button
    const handleApplyNow = async (scholarship) => {
        const applicationDetails = {
            scholarshipId: scholarship.id,
            scholarshipName: scholarship.name, // Include scholarship name
            userName: userData.name,
            email: userData.email,
            status: "Applied",
        };

        try {
            const response = await axios.post(`${config.url}/api/applications/submit`, applicationDetails);
            console.log(response.data);
            setToastMessage("Application submitted successfully!");
            setShowToast(true);
        } catch (error) {
            console.error("Error submitting application:", error);
            setToastMessage("Failed to submit application.");
            setShowToast(true);
        } finally {
            setTimeout(() => setShowToast(false), 3000); // Auto-hide toast after 3 seconds
        }
    };

    return (
        <div className="scholarshiplist">
            <div className="container">
                <h2>Available Scholarships</h2>
                {error && <p className="error">{error}</p>}
                {scholarships.length > 0 ? (
                    scholarships.map((scholarship) => (
                        <div key={scholarship.id} className="card">
                            <h3>{scholarship.name}</h3>
                            <p><strong>Description:</strong> {scholarship.description}</p>
                            <p><strong>Type:</strong> {scholarship.type}</p>
                            <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                            <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                            <p><strong>Amount:</strong> ${scholarship.amount}</p>
                            <p><strong>Institution:</strong> {scholarship.institution}</p>
                            <p><strong>Application URL:</strong> <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer">{scholarship.applicationUrl}</a></p>
                            <p><strong>Contact Email:</strong> {scholarship.contactEmail}</p>
                            <p><strong>Status:</strong> {scholarship.status}</p>
                            <button
                                className="button"
                                onClick={() => handleApplyNow(scholarship)}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No scholarships available at the moment.</p>
                )}
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="toast">
                    {toastMessage}
                    <span className="close-toast" onClick={() => setShowToast(false)}>
                        &#10006;
                    </span>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ScholarshipList;
