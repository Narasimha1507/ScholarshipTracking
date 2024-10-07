import React from 'react';
import "./aboutus.css"; // Import the CSS for styling

function AboutUs() {
    return (
        <div className='aboutus'>
        <div className="aboutus-container">
            <div className="aboutus-content">
                <h2>About Us</h2>
                <p>
                    Welcome to the Scholarship and Financial Aid Platform, your one-stop solution for discovering and applying for scholarships and financial aid. 
                    We believe that every student should have access to education, regardless of their financial background. Our platform connects students 
                    with numerous financial aid opportunities to help ease the burden of tuition fees and other educational expenses.
                </p>
                <h3>Our Mission</h3>
                <p>
                    Our mission is to democratize access to education by helping students find scholarships and financial aid programs that match their needs.
                    We strive to provide a seamless experience for students to track their applications and manage financial aid opportunities, ensuring that
                    they can focus on what matters most—achieving their academic goals.
                </p>
                <h3>Why Choose Us?</h3>
                <ul>
                    <li>Comprehensive database of scholarships and financial aid opportunities.</li>
                    <li>Personalized dashboard to track your applications and progress.</li>
                    <li>Real-time updates on new scholarships and deadlines.</li>
                    <li>Guidance on how to apply and improve your chances of success.</li>
                </ul>
                <h3>Contact Us</h3>
                <p>
                    If you have any questions or need assistance, feel free to reach out to us at 
                    <a href="mailto:support@scholarshipplatform.com"> support@scholarshipplatform.com</a>.
                    We’re here to help you make the most of your educational journey.
                </p>
            </div>
        </div>
        </div>
    );
}

export default AboutUs;
