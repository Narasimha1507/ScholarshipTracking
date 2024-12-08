const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const gmailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajunarasimha017@gmail.com", // Gmail ID
    pass: "clnf obmx mgbc sbmk", // App password
  },
});

// Endpoint to handle contact form submissions
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const mailOptions = {
    from: "rajunarasimha017@gmail.com",
    to: "rajunarasimha017@gmail.com", // Replace with your email
    subject: "Contact Request From Portfolio",
    html: `
      <h3>Contact Details:</h3>
      <p><b>First Name:</b> ${firstName}</p>
      <p><b>Last Name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    // Send the email to yourself
    await gmailTransporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");

    // After sending the email to yourself, send a confirmation email to the user
    const userConfirmationMailOptions = {
      from: "rajunarasimha017@gmail.com",
      to: email, // Send the email to the user who filled out the form
      subject: "Message Sent Confirmation",
      html: `
        <h3>Hi ${firstName} ${lastName},</h3>
        <p>Thank you for reaching out. We have received your message and will get back to you soon!</p>
        <p><b>Your Message:</b></p>
        <p>${message}</p>
        <p>Best regards,<br>Your Portfolio Team</p>
      `,
    };

    // Send the confirmation email to the user
    await gmailTransporter.sendMail(userConfirmationMailOptions);
    console.log("Confirmation Email Sent Successfully");

    // Respond with a success message
    return res.status(200).json({ code: 200, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({ code: 500, message: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
