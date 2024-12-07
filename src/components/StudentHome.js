import React, { useRef, useEffect, useState } from 'react';
import Footer from './Footer';
import "./homepage.css";
import bgVideo from './bg.mp4';
import axios from 'axios';

function HomePage() {
    const aboutUsRef = useRef(null);
    const [userName, setUserName] = useState('');

    // Scroll to AboutUs section if needed
    useEffect(() => {
        if (window.location.hash === '#aboutus') {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Retrieve user's name from local storage
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Get the userId from local storage
                const userId = localStorage.getItem('userId');
                
                // If userId exists, make the API request
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/users/profile?userId=${userId}`);
                    setUserName(response.data.name);
                }
            } catch (error) {
                console.error("Error user name:", error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="homepage">
            <div className="content-wrapper">
                <video autoPlay muted loop className="background-video">
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="content">
                    <h2>Welcome back {userName}!</h2>
                    <p>
                        This platform helps students find, apply for, and manage scholarships and financial aid.
                        You can sign up to track your application progress and receive updates on the latest financial aid opportunities.
                    </p>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default HomePage;
