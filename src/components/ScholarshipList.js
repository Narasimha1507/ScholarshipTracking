import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios';
import './scholarshiplist.css';
import Footer from './Footer';
import config from '../config';

function ScholarshipList() {
    const [scholarships, setScholarships] = useState([]); // State to store scholarships
    const navigate = useNavigate();

    // Function to fetch scholarship data from the backend
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get(`${config.url}/api/scholarships/all`);
                setScholarships(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            }
        };

        fetchScholarships();
    }, []);

    // Function to handle redirection to the login page
    const handleApplyNow = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="scholarshiplist">
            <div className="container">
                <h2>Available Scholarships</h2>
                {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="card">
                        <h3>{scholarship.name}</h3>
                        <p><strong>Description:</strong> {scholarship.description}</p>
                        <p><strong>Type:</strong> {scholarship.type}</p>
                        <p><strong>Eligibility Criteria:</strong> {scholarship.eligibility}</p>
                        <p><strong>Institution:</strong> {scholarship.institution}</p>
                        <p><strong>Application URL:</strong> <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer">{scholarship.applicationUrl}</a></p>
                        <p><strong>Contact Email:</strong> {scholarship.contactEmail}</p>
                        <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                        <p><strong>Amount:</strong> ${scholarship.amount}</p>
                        <p><strong>Status:</strong> {scholarship.status}</p>
                        <button className="button" onClick={handleApplyNow}>Apply Now</button> {/* Apply Now button */}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default ScholarshipList;
