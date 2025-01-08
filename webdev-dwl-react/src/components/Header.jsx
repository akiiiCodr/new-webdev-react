import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import { useAuth } from './AuthContext.jsx'; // Import AuthProvider

function Header() {
  const { isLoggedIn } = useAuth(); // Access the logged-in state
  const [rooms, setRooms] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Toggle the navigation menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Open the sign-up page (navigate to /register)
  const handleSignUpClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    // Fetch available beds from /rooms endpoint
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/rooms'); // Adjust the URL as needed
        if (response.data && Array.isArray(response.data)) {
          setRooms(response.data);

          // Calculate the total available beds from the rooms
          const totalAvailableBeds = response.data.reduce((acc, room) => {
            return acc + (room.available_beds || 0); // Add the available_beds count for each room
          }, 0);

          setAvailableBeds(totalAvailableBeds); // Set the total available beds
        }
      } catch (error) {
        console.error('Error fetching available beds:', error);
      }
    };

    fetchRooms();
  }, []); // This effect runs once to fetch available beds when the component mounts

  return (
    <div className="container-nav">
      {/* Left Side: Navigation Menu */}
      <div className="menu-bar">
        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          &#9776;
        </button>
        <div className={`dropdown ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" className="menu-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book-a-room" className="menu-item">
                Book a Room
              </Link>
            </li>
            <li>
              <Link to="/manage" className="menu-item">
                Manage
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="menu-item">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Center: Title and Subtitle */}
      <div className="title-section">
        <h1>
          <Link to="/">Dwell-o</Link>
        </h1>
        <p>A Better Way to Dwell</p>
      </div>

      {/* Right Side: Actions */}
      <div className="right-header">
        <div className="header-actions">
          {/* Bed Availability Button */}
          <button className="availability-button">
            <i className="fa fa-user"></i>
            <div className="availability-text">{availableBeds} Bed Availability</div>
          </button>

          {/* Calendar Button */}
          <button className="calendar-button">
            <div className="calendar-icon">&#128197;</div>
            <div className="date-text">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </button>
        </div>

        {/* Show UserInfo and Logout if authenticated */}
        {isLoggedIn ? (
          <div className="auth-logged-in">
            <UserInfo />
            <Logout />
          </div>
        ) : (
          <div className="auth-container">
            <div className="auth-content">
              <div className="auth-buttons">
                <button onClick={handleLoginClick} className="login">
                  Log In
                </button>
                <button className="sign-up" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
