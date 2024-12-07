import React, { useState } from 'react';
import './addscholarship.css'; // Ensure you have this CSS file for styling
import Footer from './Footer'; // Assuming you have a Footer component
import axios from 'axios'; // For making HTTP requests
import config from '../config';

function AddScholarship() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        eligibility: '',
        deadline: '',
        amount: '',
        institution: '',
        applicationUrl: '',
        contactEmail: '',
        status: '',
    });
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showFailureToast, setShowFailureToast] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.url}/api/scholarships/add`, formData);
            setShowSuccessToast(true); // Show the success toast
            setTimeout(() => setShowSuccessToast(false), 3000); // Hide after 3 seconds

            // Reset form fields
            setFormData({
                name: '',
                description: '',
                type: '',
                eligibility: '',
                deadline: '',
                amount: '',
                institution: '',
                applicationUrl: '',
                contactEmail: '',
                status: '',
            });
        } catch (error) {
            console.error("Error adding scholarship:", error);
            setShowFailureToast(true); // Show the failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Hide after 3 seconds
        }
    };

    const handleCloseToast = () => {
        setShowSuccessToast(false); // Close the success toast immediately
        setShowFailureToast(false); // Close the failure toast immediately
    };

    return (
        <div className="add-scholarship">
            <div className="addscholarshipcontainer">
                <h2>Add New Scholarship</h2>
                <form onSubmit={handleSubmit}>
                    <label>Scholarship Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Scholarship Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-----------</option>
                        <option value="Merit-Based">Merit-Based</option>
                        <option value="Need-Based">Need-Based</option>
                        <option value="Athletic">Athletic</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Eligibility Criteria:</label>
                    <input
                        type="text"
                        name="eligibility"
                        value={formData.eligibility}
                        onChange={handleChange}
                        required
                    />

                    <label>Deadline:</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />

                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <label>Institution:</label>
                    <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                    />

                    <label>Application URL:</label>
                    <input
                        type="url"
                        name="applicationUrl"
                        value={formData.applicationUrl}
                        onChange={handleChange}
                    />

                    <label>Contact Email:</label>
                    <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                    />

                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-----------</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <button className="button" type="submit">Add Scholarship</button>
                </form>

                {/* Success Toast */}
                {showSuccessToast && (
                    <div className="toast-success">
                        Scholarship added successfully!
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}

                {/* Failure Toast */}
                {showFailureToast && (
                    <div className="toast-failure">
                        Failed to add scholarship!
                        <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AddScholarship;
