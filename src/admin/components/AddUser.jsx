import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      navigate("/admin/manage-users");
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Could not save the user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: "600px" }}>
      <h2>Add New User</h2>

      {error && <div className="feedback feedback-error">{error}</div>}

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Add User</button>
    </form>
  );
};

export default AddUser;
