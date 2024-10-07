import React, { useState, useEffect } from 'react';
import './viewapplications.css'; // Create a CSS file for styling
import Footer from './Footer'; // Assuming you have a Footer component

function ViewApplicationsTable() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Fetch the scholarship applications data from an API (replace with your actual API call)
        const fetchApplications = async () => {
            const response = await fetch('/api/scholarship-applications'); // Example endpoint
            const data = await response.json();
            setApplications(data);
        };

        fetchApplications();
    }, []);

    return (
        <div className="view-applications">
            <div className="container">
                <h2>Student Scholarship Applications</h2>
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Scholarship Name</th>
                            <th>Application Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="5">No applications available</td>
                            </tr>
                        ) : (
                            applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.studentName}</td>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.applicationDate}</td>
                                    <td>{application.status}</td>
                                    <td>
                                        <button className="button approve-btn">Approve</button>
                                        <button className="button reject-btn">Reject</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ViewApplicationsTable;
