import React from 'react';
import './scholarshiplist.css';
import Footer from './Footer';

const scholarships = [
    { id: 1, name: 'Merit Scholarship', description: 'For top students.', deadline: '2024-10-30' },
    { id: 2, name: 'Need-Based Aid', description: 'For students in need.', deadline: '2024-11-15' }
];

function ScholarshipList() {

    // Function to handle the redirection to the login page
    const handleApplyNow = () => {
        alert("Applied Successfully!"); // Redirect to login page
    };

    return (
        <div className="scholarshiplist">
            <div className="container">
                <h2>Available Scholarships</h2>
                {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="card">
                        <h3>{scholarship.name}</h3>
                        <p>{scholarship.description}</p>
                        <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                        <button className="button" onClick={handleApplyNow}>Apply Now</button> {/* Apply Now button */}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default ScholarshipList;
