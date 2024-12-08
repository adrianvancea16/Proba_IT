import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-us">
        <h3>Contact Us</h3>
        <form className="contact-form">
          <div className="form-left">
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First Name" required />
            </div>
            <div className="form-row">
              <input type="text" name="lastName" placeholder="Last Name" required />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email" required />
            </div>
          </div>
          <div className="form-right">
            <div className="form-message">
              <textarea name="message" placeholder="Message" rows="5" required></textarea>
            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
