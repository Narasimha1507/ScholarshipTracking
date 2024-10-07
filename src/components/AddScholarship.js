import React, { useState } from 'react';
import './addscholarship.css'; // Create a custom CSS file for styling
import Footer from './Footer'; // Assuming you have a Footer component

function AddScholarship() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        eligibility: '',
        deadline: '',
        amount: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to add a new scholarship can be implemented here
        alert('Scholarship added successfully!');
    };

    return (
        <div className="add-scholarship">
            <div className="container">
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

                    <button className="button" type="submit">Add Scholarship</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddScholarship;
