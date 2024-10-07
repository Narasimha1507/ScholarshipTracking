import React, { useRef, useEffect } from 'react';
import Footer from './Footer'; // Import Footer component
import "./homepage.css"; // Import your CSS file
import bgVideo from './bg.mp4'; // Assuming bg.mp4 is stored in the same folder
import AboutUs from './AboutUs';

function HomePage() {
    const aboutUsRef = useRef(null);

    // Scroll to AboutUs section if needed
    useEffect(() => {
        if (window.location.hash === '#aboutus') {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="homepage">
            <div className="content-wrapper">
                <video autoPlay muted loop className="background-video">
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="content">
                    <h2>Welcome to the Scholarship and Financial Aid Platform</h2>
                    <p>
                        This platform helps students find, apply for, and manage scholarships and financial aid.
                        You can sign up to track your application progress and receive updates on the latest financial aid opportunities.
                    </p>
                </div>
            </div>

            {/* Add an ID to AboutUs section */}
            <div ref={aboutUsRef}>
                <AboutUs />
            </div>
            
            <Footer /> {/* Footer should be below the content */}
        </div>
    );
}

export default HomePage;
