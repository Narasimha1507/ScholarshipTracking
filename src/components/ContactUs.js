import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import Footer from './Footer';
import "./contactus.css"; // Import custom styles for the toast

function ContactUs(){
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State for success toast
  const [showErrorToast, setShowErrorToast] = useState(false); // State for error toast

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      const response = await fetch("https://portfolio-xz1c.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setButtonText("Send");
      setFormDetails(formInitialDetails);

      if (result.code === 200) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000); // Hide success toast after 3 seconds
      } else {
        setStatus({ success: false, message: "Something went wrong. Try again later." });
        setShowErrorToast(true); // Show error toast
        setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
      }
    } catch (error) {
      setStatus({ success: false, message: "Network error. Please try again later." });
      setButtonText("Send");
      setShowErrorToast(true); // Show error toast
      setTimeout(() => setShowErrorToast(false), 3000); // Hide error toast after 3 seconds
    }
  };

  const handleCloseToast = () => {
    setShowSuccessToast(false); // Close success toast manually
    setShowErrorToast(false); // Close error toast manually
  };

  return (
    <section className="contactus" id="connect">
      <Container id="container">
        <Row className="contactus-container">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 style={{color:"white"}}>Contact Us</h2>
                  <p>If you have any questions, feel free to reach out to us. We're here to help!</p>

                    <div className="contact-info">
                    <p><strong>Email:</strong> <a href="mailto:rajunarasimha017@gmail.com">rajunarasimha017@gmail.com</a></p>
                    <p><strong>Phone:</strong> +91 8555924113</p>
                    <p><strong>Address:</strong> 123 Scholarship St, Education City, USA</p>
                    </div>

                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) => onFormUpdate("firstName", e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) => onFormUpdate("lastName", e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) => onFormUpdate("email", e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) => onFormUpdate("phone", e.target.value)}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate("message", e.target.value)}
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast-success">
          Message Sent Successfully!
          <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
        </div>
      )}

      {/* Error Toast */}
      {showErrorToast && (
        <div className="toast-failure">
          Failed to send the message. Please try again!
          <span className="close-toast" onClick={handleCloseToast}>&#10006;</span>
        </div>
      )}
    <Footer/>
    </section>
  );
};
export default ContactUs;