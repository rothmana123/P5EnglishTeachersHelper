import React, { useState } from "react";
import axios from "axios";

const FeedbackComponent = ({ onLogout }) => {
  const [author, setAuthor] = useState(""); // Changed from studentName to author
  const [studentID, setStudentID] = useState(""); // Unchanged
  const [text, setText] = useState(""); // Changed from essayText to text
  const [feedback, setFeedback] = useState("");

  // Handle ChatGPT API call
  const getFeedback = async () => {
    try {
      const response = await axios.post(
        "/chatgpt-api-endpoint", // Replace with your ChatGPT API endpoint
        { prompt: text }, // Updated to use text
        { headers: { "Content-Type": "application/json" } }
      );
      setFeedback(response.data.feedback || "Feedback received!");
    } catch (error) {
      console.error("Error getting feedback:", error);
      setFeedback("An error occurred while getting feedback.");
    }
  };

  // Handle database submission
  const submitToDatabase = async () => {
    try {
      const submissionData = {
        author, // Updated to use author
        studentID,
        text, // Updated to use text
        feedback,
      };
      await axios.post(
        "https://project5backend.uc.r.appspot.com/saveEssay", // Replace with your database API endpoint
        submissionData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(submissionData);
      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Feedback Form</h2>

      {/* Author Input */}
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author} // Updated to use author
          onChange={(e) => setAuthor(e.target.value)} // Updated to setAuthor
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>

      {/* Student ID Input */}
      <div>
        <label htmlFor="studentID">Student ID:</label>
        <input
          type="text"
          id="studentID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="Enter Student ID"
        />
      </div>

      {/* Essay Text Input */}
      <div>
        <label htmlFor="text">Essay:</label> {/* Updated to use text */}
        <textarea
          id="text" // Updated to use text
          value={text} // Updated to use text
          onChange={(e) => setText(e.target.value)} // Updated to setText
          rows="6"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="Copy and paste the essay here"
        />
      </div>

      {/* Get Feedback Button */}
      <div>
        <button
          onClick={getFeedback}
          style={{ marginBottom: "10px", padding: "8px 16px" }}
        >
          Get Feedback
        </button>
      </div>

      {/* Feedback Display */}
      <div>
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          value={feedback}
          readOnly
          rows="4"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </div>

      {/* Submit to Database Button */}
      <div>
        <button onClick={submitToDatabase} style={{ padding: "8px 16px" }}>
          Submit to Database
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          background: "red",
          color: "white",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default FeedbackComponent;
