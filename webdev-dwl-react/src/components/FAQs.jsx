import React, { useState, useRef } from "react";
import bgimage from "../assets/gradient-image.svg";
const FAQs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // To track the active sidebar item
  
  const sectionsRefs = {
    AccountManagement: useRef(null),
    BookingDetails: useRef(null),
    Cancellation: useRef(null),
    PaymentRefund: useRef(null),
    ChangeBookingDates: useRef(null),
    ManageGuest: useRef(null),
    BookingConfirmation: useRef(null),
    SpecialRequests: useRef(null),
    PropertyQuestions: useRef(null),
    CustomerService: useRef(null),
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const scrollToSection = (section) => {
    setActiveSection(section); // Set the active section
    sectionsRefs[section].current.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    app: {
      display: "flex",
      backgroundImage: `url(${bgimage})`,
      backgroundSize: "cover", // Ensures the image covers the whole background
      backgroundPosition: "center", // Centers the background image
      backdropFilter: "blur(10px)", // Frosted glass effect
      WebkitBackdropFilter: "blur(10px)", // For Safari
      minHeight: "100vh",
      animation: "fadeIn 1s ease-out", // Fade-in animation
    },
    sidebar: {
      width: "250px",
      background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      padding: "20px",
      position: "sticky",
      top: "0",
      height: "100vh",
      backdropFilter: "blur(10px)", // Frosted glass effect
      WebkitBackdropFilter: "blur(10px)", // For Safari
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      animation: "slideIn 0.5s ease-out", // Slide-in animation
    },
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarListItem: {
      margin: "10px 0",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "5px",
      transition: "background-color 0.3s, transform 0.3s", // Added transform for hover effect
      background: "rgba(255, 255, 255, 0.1)", // Semi-transparent background for items
      backdropFilter: "blur(5px)",
    },
    sidebarListItemHover: {
      transform: "scale(1.05)", // Slight scale-up effect on hover
      backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter background on hover
    },
    activeSidebarListItem: {
      backgroundColor: "#fff",
      color: "blue",
    },
    content: {
      flex: "1",
      padding: "20px",
      // backdropFilter: "blur(10px)", // Frosted glass effect for content
      WebkitBackdropFilter: "blur(10px)", // For Safari
      animation: "fadeIn 1.5s ease-out", // Fade-in animation for content
    },
    faq: {
      maxWidth: "600px",
      margin: "0 auto",
    },
    faqItem: {
      marginBottom: "15px",
      backdropFilter: "blur(5px)", // Frosted glass effect for each FAQ item
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      // backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background for FAQ items
      transition: "transform 0.3s ease", // Added transform animation for question opening
    },
    faqItemOpen: {
      transform: "scale(1.05)", // Scale effect when the question is opened
    },
    faqQuestion: {
      cursor: "pointer",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background for the question
      border: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // backdropFilter: "blur(5px)", // Frosted glass effect for the question part
      transition: "background-color 0.3s, transform 0.3s", // Smooth background transition on hover
    },
    faqQuestionHover: {
      transform: "scale(1.02)", // Slight scale-up effect on hover
      backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter background on hover
    },
    arrow: {
      marginLeft: "10px",
    },
    faqAnswer: {
      padding: "10px",
      border: "1px solid #ccc",
      borderTop: "none",
      background: "rgba(255, 255, 255, 0.15)", // Semi-transparent background for the answer
      backdropFilter: "none", // Ensure no blur effect here
      transition: "height 0.3s ease", // Smooth transition for answer height
    },
    sectionTitle: {
        marginBottom: "20px", // Adds space between category and questions
        color: "#fff", // White color for section titles
        animation: "fadeIn 1s ease-out", // Fade-in animation for section titles
    },
  };

  const faqData = {
    AccountManagement: [
      { question: "How do I create an account?", answer: "To create an account, click on the Sign-Up button on the homepage and follow the instructions." },
      { question: "How do I change my Password?", answer: "Go to Account Settings and click on 'Change Password' to update your password." },
    ],
    BookingDetails: [
      { question: "How can I view my booking details?", answer: "Log in to your account and navigate to 'My Bookings' to view your booking details." },
      { question: "Can I add special requests to my booking?", answer: "Yes, you can add special requests during the booking process or contact the property directly." },
    ],
    Cancellation: [
      { question: "How can I cancel my booking?", answer: "To cancel your booking, log in to your account, navigate to 'My Bookings,' select the booking you want to cancel, and click 'Cancel Booking.'" },
      { question: "Will I get a refund if I cancel?", answer: "Refunds depend on the cancellation policy of the property. Check the cancellation terms in your booking confirmation." },
    ],
    PaymentRefund: [
      { question: "What payment methods are accepted?", answer: "We accept Gcash, Maya, and in some cases, local payment methods." },
      { question: "How long does it take to receive a refund?", answer: "Refunds typically take 5–10 business days to process, depending on your payment method." },
    ],
    ChangeBookingDates: [
      { question: "How do I change my booking dates?", answer: "Log in to your account, go to 'My Bookings,' select the booking you want to modify, and click 'Change Dates.'" },
      { question: "Will I be charged extra for changing dates?", answer: "Any additional charges depend on the property’s policy. Check the updated price before confirming the change." },
    ],
    ManageGuest: [
      { question: "How do I add additional guests to my booking?", answer: "Go to 'My Bookings,' select the booking, and click 'Edit Guest Information' to add more guests." },
      { question: "Are there limits to the number of guests per room?", answer: "Yes, each room has a maximum occupancy. Check the property details or contact the property directly." },
    ],
    BookingConfirmation: [
      { question: "How do I know if my booking is confirmed?", answer: "Once your booking is confirmed, you will receive a confirmation email with the booking details." },
      { question: "What should I do if I don’t receive a confirmation email?", answer: "Check your spam folder. If it’s not there, log in to your account and check your bookings or contact support." },
    ],
    SpecialRequests: [
      { question: "Can I request an early check-in or late check-out?", answer: "Early check-ins and late check-outs are subject to availability and the property’s policy." },
      { question: "Are special requests guaranteed?", answer: "Special requests are not guaranteed but are subject to availability at the property." },
    ],
    PropertyQuestions: [
      { question: "How do I contact the property directly?", answer: "You can find the property’s contact details in your booking confirmation email." },
      { question: "Can I ask for a room upgrade?", answer: "Room upgrades are subject to availability. Contact the property directly to inquire." },
    ],
    CustomerService: [
      { question: "How do I reach customer service?", answer: "You can contact customer service through our support page or by calling the helpline listed on our website." },
    ],
  };

  const FAQSection = ({ title, questions, sectionRef }) => (
    <div ref={sectionRef}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {questions.map((item, index) => (
        <div 
            key={index} 
            style={{
              ...styles.faqItem,
              ...(openQuestion === `${title}-${index}` ? styles.faqItemOpen : {}),
            }}>
          <div 
            style={{
              ...styles.faqQuestion,
              ...(openQuestion === `${title}-${index}` ? styles.faqQuestionHover : {}),
            }}
            onClick={() => toggleQuestion(`${title}-${index}`)}>
            {item.question}
            <span style={styles.arrow}>{openQuestion === `${title}-${index}` ? "▲" : "▼"}</span>
          </div>
          {openQuestion === `${title}-${index}` && <div style={styles.faqAnswer}>{item.answer}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <ul style={styles.sidebarList}>
          {Object.keys(faqData).map((key) => (
            <li
              key={key}
              style={{
                ...styles.sidebarListItem,
                ...(activeSection === key ? styles.activeSidebarListItem : {}),
              }}
              onClick={() => scrollToSection(key)}
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.content}>
        <div style={styles.faq}>
          {Object.entries(faqData).map(([key, questions]) => (
            <FAQSection
              key={key}
              title={key.replace(/([A-Z])/g, " $1").trim()}
              questions={questions}
              sectionRef={sectionsRefs[key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
