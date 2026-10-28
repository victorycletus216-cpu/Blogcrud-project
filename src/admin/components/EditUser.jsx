import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load the current user details into the form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Could not load this user. They may have been deleted.");
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      navigate("/admin/manage-users");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Could not update the user. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: "600px" }}>
      <h2>Edit User</h2>

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
      <button type="submit" className="btn">Update User</button>
    </form>
  );
};

export default EditUser;
