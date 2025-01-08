import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-content">
      {/* About Section */}
      <div className="footer-section">
        <h3>About Us</h3>
        <p>
          Dwell-O, a digital boarding house platform, helps anyone achieve a
          wonderful rest with great value deals.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/" className="footer-link">Home</Link></li>
          <li><Link to="/services" className="footer-link">Services</Link></li>
          <li><Link to="/contact-us" className="footer-link">Contact</Link></li>
          <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
          <li><Link to="/faqs" className="footer-link">FAQs</Link></li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=61571741602840"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            F
          </a>
          <a
            href="https://twitter.com/"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            T
          </a>
          <a
            href="https://www.instagram.com/dwe.llo/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            I
          </a>
          <a
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            L
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Dwell-O. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
