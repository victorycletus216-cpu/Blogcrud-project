import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter((user) => user.id !== id));
        setMessage({ type: "success", text: "User deleted successfully." });
      } catch (error) {
        console.error("Error deleting user:", error);
        setMessage({ type: "error", text: "Could not delete the user. Please try again." });
      }
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <Link to="/admin/add-user" className="btn">
        Add New User
      </Link>

      {message && (
        <div
          className={`feedback ${
            message.type === "success" ? "feedback-success" : "feedback-error"
          }`}
        >
          {message.text}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {users.length === 0 && <p>No users yet. Add your first user!</p>}
        {users.map((user) => (
          <div key={user.id} className="admin-card">
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <button
                className="btn btn-small"
                style={{ marginRight: "10px" }}
                onClick={() => navigate(`/admin/edit-user/${user.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-small btn-delete"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
