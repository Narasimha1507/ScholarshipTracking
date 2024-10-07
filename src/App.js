import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ScholarshipList from './components/ScholarshipList';
import ScholarshipDetail from './components/ScholarshipDetail';
import ApplicationForm from './components/ApplicationForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ForgotPassword from './components/ForgotPassword';
import StudentHome from './components/StudentHome'
import StudentScholarship from './components/StudentScholarship'
import StudentProfile from './components/StudentProfile'
import AdminLogin from './components/AdminLogin'
import AdminHome from './components/AdminHome';
import AddStudent from './components/AddStudent'
import AddScholarship from './components/AddScholarship';
import ViewStudent from './components/ViewStudent';
import ViewApplicationsTable from './components/ViewApplications';
import ViewScholarships from './components/ViewScholarships';
import AdminNavBar from './components/AdminNavBar'
import StudentNavBar from './components/StudentNavBar'

export default function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
    useEffect(() => {
        const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
        
        setIsAdminLoggedIn(adminLoggedIn);
        setIsStudentLoggedIn(studentLoggedIn);
      }, []);

      const onAdminLogin = () => {
        localStorage.setItem('isAdminLoggedIn', 'true');
        setIsAdminLoggedIn(true);
      }
    
      const onStudentLogin = () => {
        localStorage.setItem('isStudentLoggedIn', 'true');
        setIsStudentLoggedIn(true);
      }
    return (
        <Router>
            {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isStudentLoggedIn ? (
          <StudentNavBar />
        ) : (
          <Navbar
            onAdminLogin={onAdminLogin}
            onStudentLogin={onStudentLogin}
          />
        )}
            <Routes>
                {/* Home Page Route */}
                <Route path="/" element={<HomePage />} />
                
                {/* Scholarship Detail Route with Dynamic Parameter */}
                <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
                
                {/* Scholarship List Route */}
                <Route path="/scholarships" element={<ScholarshipList />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/studenthome" element={<StudentHome />} />
                <Route path="/studentscholarship" element={<StudentScholarship />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/admin" element={<AdminLogin onAdminLogin={onAdminLogin}/>} />
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/addstudent" element={<AddStudent />} />
                <Route path="/addscholarship" element={<AddScholarship />} />
                <Route path="/viewstudent" element={<ViewStudent />} />
                <Route path="/applications" element={<ViewApplicationsTable />} />
                <Route path="/viewscholarship" element={<ViewScholarships />} />

                
                {/* Application Form Route */}
                <Route path="/apply" element={<ApplicationForm />} />
                
                {/* Login Route */}
                <Route path="/login" element={<Login onStudentLogin={onStudentLogin}/>} />
                
                {/* SignUp Route */}
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}
