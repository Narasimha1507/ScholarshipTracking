import React from 'react';
import './footer.css'; // Import the CSS for footer styling

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>
                        We aim to make education accessible by helping students find scholarships and financial aid opportunities.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/aboutus">About Us</a></li>
                        <li><a href="/scholarships">Scholarships</a></li>
                        <li><a href="/contactus">Contact Us</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: <a href="mailto:support@scholarshipplatform.com">support@scholarshipplatform.com</a></p>
                    <p>Phone: +1-234-567-890</p>
                </div>

                <div className="footer-section social">
                    <h4>Follow Us</h4>
                    <a href="https://www.facebook.com" className="social-link">Facebook</a>
                    <a href="https://www.twitter.com" className="social-link">Twitter</a>
                    <a href="https://www.linkedin.com" className="social-link">LinkedIn</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Scholarship Platform. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
