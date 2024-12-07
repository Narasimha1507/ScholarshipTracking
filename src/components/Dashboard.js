import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChartComponent from './PieChartComponent';
import "./dashboard.css";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [adminCounts, setAdminCounts] = useState({ totalUsers: 0 });
  const [statusCounts, setStatusCounts] = useState({ Approved: 0, Applied: 0, Rejected: 0 });
  const [totalApplications, setTotalApplications] = useState(0); 
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); 
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // Centralize data fetching logic
  const fetchData = async () => {
    setLoading(true);
    try {
      const [adminCountsRes, statusCountsRes, scholarshipsRes, applicationsRes] = await Promise.all([
        axios.get('http://localhost:8080/api/admin/getCounts'),
        axios.get('http://localhost:8080/api/scholarships/applicationCounts'),
        axios.get('http://localhost:8080/api/scholarships/all'),
        axios.get('http://localhost:8080/api/scholarships/applications'),
      ]);

      setAdminCounts(adminCountsRes.data);
      setStatusCounts(statusCountsRes.data);
      setScholarships(scholarshipsRes.data);
      setApplications(applicationsRes.data);
      setTotalApplications(applicationsRes.data.length);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  const getAwardedAmount = (scholarshipId) => {
    const scholarship = scholarships.find((scholarship) => scholarship.id === scholarshipId);
    return scholarship ? scholarship.amount : 'N/A';
  };

  const openConfirmPopup = (application, action) => {
    setSelectedApplication({ ...application, action });
    setShowConfirmPopup(true);
  };

  const closeConfirmPopup = () => {
    setShowConfirmPopup(false);
    setSelectedApplication(null);
  };

  const updateApplicationStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/applications/${selectedApplication.id}/status`, { status: newStatus });
      setShowToast(true);
      fetchData(); // Refresh data after successful update
    } catch (error) {
      console.error(`Error updating application status to ${newStatus}:`, error);
      setShowFailureToast(true);
    } finally {
      closeConfirmPopup();
      setTimeout(() => {
        setShowToast(false);
        setShowFailureToast(false);
      }, 3000);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Scholarship Dashboard</h2>

      {error && <p className="error-message">{error}</p>}
      <div className="overview">
        <div className="overview-data">
          <h2>Overview</h2>
          <p>Total Users: {adminCounts.totalUsers}</p>
          <p>Total Applications: {totalApplications}</p>
          <p>Approved Applications: {statusCounts.Approved}</p>
          <p>Pending Applications: {statusCounts.Applied}</p>
          <p>Rejected Applications: {statusCounts.Rejected}</p>
        </div>
        <div className="pie-chart">
          <PieChartComponent 
            data={[statusCounts.Approved, statusCounts.Applied, statusCounts.Rejected]}
            labels={['Approved', 'Applied', 'Rejected']}
          />
        </div>
      </div>

      <h2>Scholarship Applications</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>Status</th>
            <th>Awarded Amount</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.scholarshipName}</td>
              <td>{app.status}</td>
              <td>{getAwardedAmount(app.scholarshipId) || 'N/A'}</td>
              <td>{app.userName}</td>
              <td>{app.email}</td>
              <td>
                <button onClick={() => openConfirmPopup(app, 'Approve')}>Approve</button>
                <button onClick={() => openConfirmPopup(app, 'Reject')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showToast && (
        <div className="toast-success">
          Application updated successfully!
          <span className="close-toast" onClick={() => setShowToast(false)}>&#10006;</span>
        </div>
      )}

      {showFailureToast && (
        <div className="toast-failure">
          Failed to update application!
          <span className="close-toast" onClick={() => setShowFailureToast(false)}>&#10006;</span>
        </div>
      )}

      {showConfirmPopup && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <p>
              Are you sure you want to {selectedApplication?.action.toLowerCase()} this application for{' '}
              <strong>{selectedApplication?.scholarshipName}</strong>?
            </p>
            <div className="confirm-popup-actions">
              <button className="button cancel-btn" onClick={closeConfirmPopup}>No</button>
              <button
                className="button confirm-btn"
                onClick={() => updateApplicationStatus(selectedApplication.action === 'Approve' ? 'Approved' : 'Rejected')}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
