import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'; // Import your CSS file for the form styling

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(''); // New state for user's email
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if form is submitting
  const [showSuccess, setShowSuccess] = useState(false); // To control success message visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !phone || !message || !email) {
      setError('Please fill out all fields.');
      return;
    }

    const contactData = { name, phone, message, email };

    setIsSubmitting(true); // Show loading state
    try {
      // Send POST request to Spring Boot backend
      await axios.post('http://localhost:8080/contacts/create', contactData);
      setShowSuccess(true); // Show success message only after successful submission
    } catch (error) {
      setError('Error sending message. Please try again later.');
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        {error && <p className="error">{error}</p>}
        
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}  // Ensure name is set correctly
          placeholder="Enter your name"
          required
        />
        
        <label htmlFor="phone">Phone Number:</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message"
          required
        />
        
        <button type="submit" className="submit-button">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Success message modal with background blur */}
      {showSuccess && (
        <>
          <div className="success-message-overlay" onClick={() => setShowSuccess(false)}></div>
          <div className="success-message">
            <p>
              Message sent successfully! Thank you,for contacting us. <br></br> We will get back to you soon. 😊
            </p>
            <button 
              onClick={() => {
                setShowSuccess(false); 
                setName(''); // Reset fields after modal is closed
                setPhone('');
                setMessage('');
                setEmail('');
              }}
            >
              OK
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactForm;
