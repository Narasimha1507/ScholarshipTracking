import React, { useState } from 'react';

function ApplicationForm() {
    const [form, setForm] = useState({ name: '', email: '', scholarshipId: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to submit application
        alert('Application Submitted!');
    };

    return (
        <div className="container">
            <h2>Apply for Scholarship</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                <label>Scholarship ID:</label>
                <input type="text" name="scholarshipId" value={form.scholarshipId} onChange={handleChange} required />
                <button className="button" type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default ApplicationForm;
