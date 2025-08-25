import React, { useState } from "react";
import axios from "axios";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/addUser`, { name, email });

      alert("User added successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      if (err.response) {
     
        alert(err.response.data.error || "Failed to add user");
      } else {
      
        console.error(" Network error:", err);
        alert("Network error");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add User
        </button>
      </form>
    </div>
  );
}
