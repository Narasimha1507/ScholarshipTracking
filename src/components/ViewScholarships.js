import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link for navigation to edit pages
import './viewscholarships.css'; // Create your custom CSS for styling
import Footer from './Footer'; // Assuming Footer is a shared component

function ViewScholarships() {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        // Fetch the scholarships data from an API (replace with your actual API call)
        const fetchScholarships = async () => {
            const response = await fetch('/api/scholarships'); // Example endpoint
            const data = await response.json();
            setScholarships(data);
        };

        fetchScholarships();
    }, []);

    const handleDelete = (id) => {
        // Logic to delete the scholarship (add your delete API call here)
        alert(`Deleted scholarship with ID: ${id}`);
    };

    return (
        <div className="view-scholarships">
            <div className="container">
                <h2>Scholarship Management</h2>
                <table className="scholarships-table">
                    <thead>
                        <tr>
                            <th>Scholarship Name</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.length === 0 ? (
                            <tr>
                                <td colSpan="4">No scholarships available</td>
                            </tr>
                        ) : (
                            scholarships.map((scholarship) => (
                                <tr key={scholarship.id}>
                                    <td>{scholarship.name}</td>
                                    <td>{scholarship.description}</td>
                                    <td>{scholarship.deadline}</td>
                                    <td>
                                        <Link to={`/admin/edit-scholarship/${scholarship.id}`} className="button edit-btn">Edit</Link>
                                        <button 
                                            className="button delete-btn" 
                                            onClick={() => handleDelete(scholarship.id)}
                                        >
                                            Delete
                                        </button>
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

export default ViewScholarships;
