import React from 'react';

function ScholarshipDetail({ match }) {
    const scholarshipId = match.params.id;
    // Fetch scholarship details from API in real implementation
    const scholarship = { id: scholarshipId, name: 'Merit Scholarship', description: 'For top students.', amount: '$2000' };
    
    return (
        <div className="container">
            <h2>{scholarship.name}</h2>
            <p>{scholarship.description}</p>
            <p><strong>Amount:</strong> {scholarship.amount}</p>
            <button className="button">Apply Now</button>
        </div>
    );
}

export default ScholarshipDetail;
