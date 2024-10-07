import React from 'react';
import './contactus.css'; // Import the CSS file for styling
import Footer from './Footer';

function ContactUs() {
    return (
        <div className='contactus'>
        <div className="contactus-container">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us. We're here to help!</p>

            <div className="contact-info">
                <p><strong>Email:</strong> <a href="mailto:support@scholarshipplatform.com">support@scholarshipplatform.com</a></p>
                <p><strong>Phone:</strong> +1-234-567-890</p>
                <p><strong>Address:</strong> 123 Scholarship St, Education City, USA</p>
            </div>

            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
        <Footer/>
        </div>
    );
}

export default ContactUs;
