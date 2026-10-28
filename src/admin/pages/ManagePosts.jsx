import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import formatDate from "../../formatDate";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Show a success message after creating or editing an article
  useEffect(() => {
    if (location.state && location.state.flash) {
      setMessage({ type: "success", text: location.state.flash });
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error("Failed to load posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          "Could not load your articles. Please make sure the API server is running and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }
        setPosts(posts.filter((post) => post.id !== id));
        setMessage({ type: "success", text: "Article deleted successfully." });
      } catch (error) {
        console.error("Error deleting post:", error);
        setMessage({
          type: "error",
          text: "Could not delete the article. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Manage Articles</h2>
          <p className="admin-page-sub">
            View, edit or remove the articles on The Daily Edit.
          </p>
        </div>
        <Link to="/admin/add-post" className="btn">
          + Add New Article
        </Link>
      </div>

      {message && (
        <div
          className={`feedback ${
            message.type === "success" ? "feedback-success" : "feedback-error"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading && <p className="admin-state">Loading articles...</p>}

      {error && <div className="feedback feedback-error">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <p className="admin-state">
          No articles yet. Create your first article!
        </p>
      )}

      {!loading && !error && posts.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <span className="admin-table-title">{post.title}</span>
                  {post.author && (
                    <span className="admin-table-sub">by {post.author}</span>
                  )}
                </td>
                <td data-label="Category">
                  {post.category ? (
                    post.category
                  ) : (
                    <span className="admin-table-empty">No category</span>
                  )}
                </td>
                <td data-label="Date">
                  {formatDate(post.date) || (
                    <span className="admin-table-empty">No date</span>
                  )}
                </td>
                <td data-label="Actions">
                  <div className="admin-table-actions">
                    <Link
                      to={`/post/${post.id}`}
                      className="btn btn-small btn-outline"
                      aria-label={`View ${post.title}`}
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-small"
                      aria-label={`Edit ${post.title}`}
                      onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      aria-label={`Delete ${post.title}`}
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePosts;
