import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyApplications.css'; // Add styling for this component if needed
import Footer from './Footer';
import config from '../config';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const fetchEmailAndApplications = async () => {
            const userId = localStorage.getItem('userId'); // Get userId from localStorage
            if (!userId) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const emailResponse = await axios.get(`${config.url}/api/users/profile?userId=${userId}`);
                const userEmail = emailResponse.data.email;

                if (!userEmail) {
                    setError("User email not found.");
                    setLoading(false);
                    return;
                }

                const applicationsResponse = await axios.get(`${config.url}/api/applications/email/${userEmail}`);
                setApplications(applicationsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmailAndApplications();
    }, []);

    const openConfirmPopup = (application) => {
        setSelectedApplication(application);
        setShowConfirmPopup(true);
    };

    const closeConfirmPopup = () => {
        setShowConfirmPopup(false);
        setSelectedApplication(null);
    };

    const handleCancel = async () => {
        try {
            await axios.delete(`${config.url}/api/applications/${selectedApplication.id}`);
            setApplications((prev) => prev.filter((app) => app.id !== selectedApplication.id));
            setToastMessage("Application canceled successfully!");
            setShowToast(true);
        } catch (error) {
            console.error("Error during cancellation:", error.response || error);
            setToastMessage("Failed to cancel application. Please try again.");
            setShowToast(true);
        } finally {
            setShowConfirmPopup(false);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <div className="my-applications">
            <div className="applications-container">
                <h2>My Scholarship Applications</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : applications.length === 0 ? (
                    <p>You have not submitted any applications yet.</p>
                ) : (
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Scholarship Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.status}</td>
                                    <td>
                                        <button
                                            disabled={application.status !== 'Applied'} // Disable button if status is not 'Applied'
                                            onClick={() => openConfirmPopup(application)}
                                        >
                                            Cancel Application
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <p>
                            Are you sure you want to cancel the application for{' '}
                            <strong>{selectedApplication?.scholarshipName}</strong>?
                        </p>
                        <div className="confirm-popup-actions">
                            <button className="button cancel-btn" onClick={closeConfirmPopup}>
                                No
                            </button>
                            <button className="button delete-btn" onClick={handleCancel}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifications */}
            {showToast && (
                <div className="toast">
                    {toastMessage}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default MyApplications;
