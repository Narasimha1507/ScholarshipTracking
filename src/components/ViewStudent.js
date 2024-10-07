import React, { useState, useEffect } from 'react';
import './viewstudent.css'; // Create a CSS file for styling
import Footer from './Footer'; // Assuming you have a Footer component

function ViewStudentsTable() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the students' data from an API (replace with your actual API call)
        const fetchStudents = async () => {
            const response = await fetch('/api/students'); // Example endpoint
            const data = await response.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    return (
        <div className="view-students">
            <div className="container">
                <h2>Students List</h2>
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Aadhar</th>
                            <th>Date of Birth</th>
                            <th>College</th>
                            <th>CGPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="8">No students available</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.aadhar}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.college}</td>
                                    <td>{student.cgpa}</td>
                                    <td>
                                        <button className="button edit-btn">Edit</button>
                                        <button className="button delete-btn">Delete</button>
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

export default ViewStudentsTable;
