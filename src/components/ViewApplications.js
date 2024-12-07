import React, { useState, useEffect } from 'react';
import './viewapplications.css'; // Add your CSS styling here
import Footer from './Footer'; // Assuming you have a Footer component
import axios from 'axios'; // For making API requests

function ViewApplicationsTable() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); // State for success toast
    const [showFailureToast, setShowFailureToast] = useState(false); // State for failure toast
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // State for the confirmation popup
    const [selectedApplication, setSelectedApplication] = useState(null); // State for the selected application

    // Fetch all applications from the backend API
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/applications/all");
                console.log(response.data); // Check the data
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
                setError("Failed to load applications.");
            }
        };
    
        fetchApplications();
    }, []);

    // Open the confirmation pop-up for approve or reject
    const openConfirmPopup = (application, action) => {
        setSelectedApplication({ ...application, action });
        setShowConfirmPopup(true);
    };

    // Close the confirmation pop-up
    const closeConfirmPopup = () => {
        setShowConfirmPopup(false);
        setSelectedApplication(null);
    };

    // Handle Approve action with confirmation
    // Handle Approve action with confirmation
const handleApprove = async () => {
    if (selectedApplication.action === 'Approve') {
        try {
            await axios.put(`http://localhost:8080/api/applications/${selectedApplication.id}/status`, { status: "Approved" });
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === selectedApplication.id ? { ...app, status: "Approved" } : app
                )
            );
            setShowToast(true); // Show success toast
            closeConfirmPopup(); // Close the popup after successful action
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } catch (error) {
            console.error("Error approving application:", error);
            setShowFailureToast(true); // Show failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
        }
    }
};

// Handle Reject action with confirmation
const handleReject = async () => {
    if (selectedApplication.action === 'Reject') {
        try {
            await axios.put(`http://localhost:8080/api/applications/${selectedApplication.id}/status`, { status: "Rejected" });
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === selectedApplication.id ? { ...app, status: "Rejected" } : app
                )
            );
            setShowToast(true); // Show success toast
            closeConfirmPopup(); // Close the popup after successful action
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } catch (error) {
            console.error("Error rejecting application:", error);
            setShowFailureToast(true); // Show failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide failure toast after 3 seconds
        }
    }
};


    return (
        <div className="view-applications">
            <div className="container">
                <h2>Student Scholarship Applications</h2>
                {error && <p className="error">{error}</p>}
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Scholarship Name</th>
                            <th>User Name</th> {/* Changed column header */}
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
                                    <td>{application.email}</td>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.userName}</td> {/* Changed from application.date */}
                                    <td>{application.status}</td>
                                    <td>
                                        <button
                                            className="button approve-btn"
                                            onClick={() => openConfirmPopup(application, 'Approve')}
                                            disabled={application.status === "Approved"}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="button reject-btn"
                                            onClick={() => openConfirmPopup(application, 'Reject')}
                                            disabled={application.status === "Rejected"}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Show green toast on success */}
                {showToast && (
                    <div className="toast-success">
                        Application updated successfully!
                        <span className="close-toast" onClick={() => setShowToast(false)}>&#10006;</span>
                    </div>
                )}

                {/* Show red toast on failure */}
                {showFailureToast && (
                    <div className="toast-failure">
                        Failed to update application!
                        <span className="close-toast" onClick={() => setShowFailureToast(false)}>&#10006;</span>
                    </div>
                )}
            </div>

            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <p>
                            Are you sure you want to {selectedApplication?.action.toLowerCase()} this application for{' '}
                            <strong>{selectedApplication?.scholarshipName}</strong>?
                        </p>
                        <div className="confirm-popup-actions">
                            <button className="button cancel-btn" onClick={closeConfirmPopup}>
                                No
                            </button>
                            <button
                                className="button confirm-btn"
                                onClick={selectedApplication?.action === 'Approve' ? handleApprove : handleReject}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default ViewApplicationsTable;
