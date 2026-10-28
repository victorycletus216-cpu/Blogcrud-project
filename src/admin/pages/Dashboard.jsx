import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import formatDate from "../../formatDate";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postsResponse = await fetch(`${API_BASE_URL}/posts`);
        if (!postsResponse.ok) {
          throw new Error("Failed to load articles");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        const usersResponse = await fetch(`${API_BASE_URL}/users`);
        if (!usersResponse.ok) {
          throw new Error("Failed to load users");
        }
        const usersData = await usersResponse.json();
        setUserCount(usersData.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(
          "Could not load the dashboard data. Please make sure the API server is running and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Newest first (dates are stored as "YYYY-MM-DD")
  const sortedPosts = [...posts].sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  );
  const latestPost = sortedPosts[0];
  const latestDate = latestPost ? formatDate(latestPost.date) : "";
  const recentPosts = sortedPosts.slice(0, 3);

  return (
    <div>
      <h2>Editorial Dashboard</h2>
      <p className="admin-welcome">
        Welcome back! Here is a quick overview of The Daily Edit.
      </p>

      {loading && <p className="admin-state">Loading dashboard data...</p>}

      {error && <div className="feedback feedback-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="stat-cards">
            <div className="stat-card">
              <p className="stat-number">{posts.length}</p>
              <p className="stat-label">Total Articles</p>
            </div>

            <div className="stat-card">
              <p className="stat-number">{userCount}</p>
              <p className="stat-label">Total Users</p>
            </div>

            <div className="stat-card">
              <p className="stat-title">
                {latestPost ? latestPost.title : "No articles yet"}
              </p>
              <p className="stat-label">
                {latestPost
                  ? latestDate
                    ? `Latest article · ${latestDate}`
                    : "Latest article"
                  : "Create your first article to get started"}
              </p>
            </div>
          </div>

          <div className="admin-actions">
            <Link to="/admin/add-post" className="btn">
              + Add New Article
            </Link>
            <Link to="/admin/manage-posts" className="btn btn-outline">
              Manage Articles
            </Link>
          </div>

          <section className="admin-recent" aria-labelledby="recent-heading">
            <h3 id="recent-heading">Recent Articles</h3>

            {recentPosts.length === 0 && (
              <p className="admin-state">
                No articles yet. Create your first article!
              </p>
            )}

            <ul className="recent-list">
              {recentPosts.map((post) => (
                <li key={post.id} className="recent-item">
                  <div>
                    <span className="recent-title">{post.title}</span>
                    <span className="recent-date">
                      {formatDate(post.date) || "No date set"}
                    </span>
                  </div>
                  <Link
                    to={`/admin/edit-post/${post.id}`}
                    className="btn btn-small btn-outline"
                    aria-label={`Edit ${post.title}`}
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
