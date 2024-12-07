import React, { useState, useEffect } from 'react';
import './viewstudent.css';
import Footer from './Footer';

function ViewStudentsTable() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showFailureToast, setShowFailureToast] = useState(false);

    // Fetch students from the API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/getusers');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const openConfirmPopup = (student) => {
        setSelectedStudent(student);
        setShowConfirm(true);
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8080/api/admin/deleteuser/${selectedStudent.id}`, {
                method: 'DELETE',
            });

            // Remove the deleted student from the state
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== selectedStudent.id)
            );

            setShowSuccessToast(true); // Show success toast
            setTimeout(() => setShowSuccessToast(false), 3000); // Auto-hide toast after 3 seconds
        } catch (error) {
            console.error("Error deleting student:", error);
            setShowFailureToast(true); // Show failure toast
            setTimeout(() => setShowFailureToast(false), 3000); // Auto-hide toast after 3 seconds
        } finally {
            setShowConfirm(false);
        }
    };

    const closeConfirmPopup = () => {
        setShowConfirm(false);
        setSelectedStudent(null);
    };

    const handleCloseToast = () => {
        setShowSuccessToast(false);
        setShowFailureToast(false);
    };

    return (
        <div className="view-students">
            <div className="container">
                <h2>Users List</h2>
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Aadhar</th>
                            <th>Date of Birth</th>
                            <th>Father's Name</th>
                            <th>Father's Phone</th>
                            <th>Mother's Name</th>
                            <th>Mother's Phone</th>
                            <th>College</th>
                            <th>CGPA</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="13">No students available</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.aadhar}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.fatherName}</td>
                                    <td>{student.fatherPhone}</td>
                                    <td>{student.motherName}</td>
                                    <td>{student.motherPhone}</td>
                                    <td>{student.college}</td>
                                    <td>{student.cgpa}</td>
                                    <td>{student.userType}</td>
                                    <td>
                                        <button className="button edit-btn">Edit</button>
                                        <button
                                            className="button delete-btn"
                                            onClick={() => openConfirmPopup(student)}
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

            {/* Confirmation Popup */}
            {showConfirm && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <p>
                            Are you sure you want to delete the user{' '}
                            <strong>{selectedStudent?.name}</strong>?
                        </p>
                        <div className="confirm-popup-actions">
                            <button className="button cancel-btn" onClick={closeConfirmPopup}>
                                Cancel
                            </button>
                            <button className="button delete-btn" onClick={handleDelete}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifications */}
            {showSuccessToast && (
                <div className="toast-success">
                    Student deleted successfully!
                    <span className="close-toast" onClick={handleCloseToast}>
                        &#10006;
                    </span>
                </div>
            )}

            {showFailureToast && (
                <div className="toast-failure">
                    Failed to delete the student. Please try again.
                    <span className="close-toast" onClick={handleCloseToast}>
                        &#10006;
                    </span>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default ViewStudentsTable;
