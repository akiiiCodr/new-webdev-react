import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

function Tenants({ selectedTenant, onSelectTenant }) {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [tenantOptions, setTenantOptions] = useState([]);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isAnimating, setIsAnimating] = useState(false);
  

  const handleClick = () => {
    // Start animation
    setIsAnimating(true);
    fetchTenants();

    // Reset animation class after animation completes (1 second)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Match the duration of the animation
  };


  // Fetch tenant data
  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tenants');
      setTenants(response.data);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    }
  };

  // Fetch data on component mount and set up polling
  useEffect(() => {
    fetchTenants();
    const interval = setInterval(() => {
      fetchTenants();
    }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleTenantClick = (tenant) => {
    console.log("Clicked Tenant ID:", tenant.tenant_id);
    onSelectTenant(tenant.tenant_id);
  };

  const handleOpenModal = (tenant) => {
    setTenantOptions(tenants); 
    setSelectedTenantId(tenant.tenant_id); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setUsername(""); 
    setPassword(""); 
  };

  const handleCreateAccount = async () => {
    if (username && password && selectedTenantId) {
      try {
        // Make the API call to update the tenant account by tenantId
        const response = await axios.post(`http://localhost:5001/api/tenant-create/${selectedTenantId}`, {
          username,  // Include the username provided by the admin
          password,  // Include the password
        });
  
        if (response.status === 200) {
          setShowModal(false); 
          setShowConfirmationModal(true); 
        }
      } catch (err) {
        console.error('Error creating account:', err);
        alert("Error creating the account. Please try again.");
      }
    } else {
      alert("Please enter a username, password, and select a tenant.");
    }
  };
  
  
  
  

  const handleConfirmAccountCreation = () => {
    console.log(`Account created for tenant ID: ${selectedTenantId} with username: ${username}`);
    setShowConfirmationModal(false); 
    setShowModal(false); 
    setUsername(""); 
    setPassword(""); 
  };

  const handleCancelAccountCreation = () => {
    setShowConfirmationModal(false); 
    setShowModal(true); 
  };

  return (
    <div className="tenants">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <FontAwesomeIcon
          icon={faRefresh}
          size="3x"
          onClick={handleClick}
          className={isAnimating ? 'icon-animate' : ''}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: '#00aeff',
            padding: '10px',
          }}
          title="Refresh"
        />
    </div>

      {tenants.length > 0 ? (
        <ul>
          {tenants.map((tenant) => {
            const calculateStayDuration = (startDate, endDate) => {
              const start = new Date(startDate);
              const end = endDate ? new Date(endDate) : new Date();

              const diffInMs = end - start;
              const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

              const years = Math.floor(diffInDays / 365);
              const months = Math.floor((diffInDays % 365) / 30);
              const days = diffInDays % 30;

              return { years, months, days };
            };

            const stayDuration = tenant.rental_start
              ? calculateStayDuration(tenant.rental_start, tenant.lease_end)
              : null;

            return (
              <li
                key={tenant.id}
                style={{
                  boxShadow:
                    selectedTenant === tenant.tenant_id
                      ? "0 0 10px #00aeff"
                      : "none",
                  padding: "10px",
                  margin: "5px 0",
                  cursor: "pointer",
                  position: "relative",
                  transition: "box-shadow 0.3s ease",
                }}
                onClick={() => handleTenantClick(tenant)}
              >
                {tenant.lease_end && (
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "#fff",
                      borderRadius: "50%",
                      border: "2px solid #ff6347",
                      backgroundColor: "#ff6347",
                      fontWeight: "bold",
                      fontSize: "20px",
                      textAlign: "center",
                      width: "90px",
                      height: "90px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transform: "rotate(-45deg)",
                    }}
                  >
                    LEASED
                  </span>
                )}
                <h2>{tenant.tenant_name}</h2>
                <p>Email: {tenant.email_address}</p>
                <p>Contact: {tenant.contact_no}</p>
                <p>Address: {tenant.home_address}</p>
                <p>Birthday: {formatDate(tenant.birthday)}</p>
                <p>Rental Start: {formatDate(tenant.rental_start)}</p>
                {tenant.lease_end ? (
                  <p>Lease End: {formatDate(tenant.lease_end)}</p>
                ) : (
                  <p>Lease End: Not specified</p>
                )}
                {stayDuration && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#ffad38",
                      color: "#000",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    {`${stayDuration.years}y ${stayDuration.months}m ${stayDuration.days}d`}
                  </span>
                )}

                {/* Sign Up Button */}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button
                    onClick={() => handleOpenModal(tenant)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No tenants found.</p>
      )}

      {/* Main Modal */}
        {showModal && (
          <div className="modal-overlay" style={modalOverlayStyles}>
            <div className="modal-card" style={modalCardStyles}>
              <h3>Select Tenant, Enter Username, and Create Account</h3>
              <div>
                <label>Select Tenant:</label>
                <select
                  value={selectedTenantId} 
                  onChange={(e) => setSelectedTenantId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  }}
                >
                  <option value="" style={{ color: "black" }} >Select a tenant</option>
                  {tenantOptions.map((tenant) => (
                    <option key={tenant.tenant_id} value={tenant.tenant_id} style={{ color: "black" }}>
                      {tenant.tenant_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Username Input */}
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={modalInputStyles}
                  placeholder="Enter username"
                />
              </div>

              {/* Password Input */}
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={modalInputStyles}
                  placeholder="Enter password"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={handleCreateAccount} style={modalButtonStyles}>
                  Create Account
                </button>
                <button onClick={handleCloseModal} style={cancelButtonStyles}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}

// Styles for the modal-overlay and modal-card
const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // dim the background slightly
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalCardStyles = {
  backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent white
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)", // Create the blur effect
  border: "1px solid rgba(255, 255, 255, 0.3)", // Light border for the frosted effect
  color: "#fff", // Text color to ensure readability
};

// Modal title and button styles can also be adjusted for better aesthetics
const modalButtonStyles = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "14px",
  cursor: "pointer",
};

const cancelButtonStyles = {
  backgroundColor: "#f44336",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "14px",
  cursor: "pointer",
};

const modalInputStyles = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border for the glass effect
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent input field
  color: "#fff", // Ensure input text is readable
};



export default Tenants;
