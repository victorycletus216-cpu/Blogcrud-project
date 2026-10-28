import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import PostImage from "../components/PostImage";
import Newsletter from "../components/Newsletter";
import ChatBot from "react-chatbotify";
import formatDate from "../formatDate";
import readingTime from "../readingTime";
import API_BASE_URL from "../apiConfig";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple chat widget settings - uses the site's orange accent colour
  const flowSteps = {
    start: {
      message: "Hello! How can I assist you today?",
    },
  };

  const chatSettings = {
    general: {
      primaryColor: "#c4470a",
      secondaryColor: "#a03805",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Show the newest posts first (dates are stored as "YYYY-MM-DD")
  const sortedPosts = [...posts].sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  );

  // Featured article: prefer one that has a real image, otherwise the newest
  const postWithImage = sortedPosts.find((post) =>
    (post.imageUrl || "").startsWith("http")
  );
  const featuredPost = postWithImage || sortedPosts[0];

  // All the other articles - the grid shows up to six of them
  const otherPosts = sortedPosts.filter(
    (post) => post.id !== featuredPost?.id
  );
  const visiblePosts = otherPosts.slice(0, 6);

  // A short excerpt for the featured article (guard against missing body)
  const featuredBody = featuredPost ? featuredPost.body || "" : "";
  const featuredExcerpt =
    featuredBody.length > 180
      ? featuredBody.substring(0, 180).trim() + "..."
      : featuredBody;

  const featuredMeta = [
    featuredPost && featuredPost.date ? formatDate(featuredPost.date) : "",
    readingTime(featuredBody),
  ]
    .filter(Boolean)
    .join(" \u00b7 ");

  // "View All Articles" opens the header search panel, which lists every article
  const showAllArticles = () => {
    window.dispatchEvent(new CustomEvent("open-article-search"));
  };

  return (
    <div>
      <header className="page-header">
        <h1>The Daily Edit</h1>
        <p className="site-tagline">Stories, Ideas &amp; Inspiration.</p>
      </header>

      {loading && (
        <div className="loading-state">
          <p>Loading the latest stories...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>We could not load the posts. Please try again later.</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>
            There are no articles to show right now. Check back soon for
            stories, ideas and inspiration!
          </p>
        </div>
      )}

      {!loading && !error && featuredPost && (
        <article className="featured-post">
          <div className="featured-image">
            <PostImage
              src={featuredPost.imageUrl}
              title={featuredPost.title}
            />
          </div>
          <div className="featured-content">
            {featuredPost.category && (
              <span className="category-label">{featuredPost.category}</span>
            )}
            <h2>
              <Link to={`/post/${featuredPost.id}`}>{featuredPost.title}</Link>
            </h2>
            <div className="post-meta">{featuredMeta}</div>
            {featuredExcerpt && (
              <p className="featured-excerpt">{featuredExcerpt}</p>
            )}
            <Link
              to={`/post/${featuredPost.id}`}
              className="btn featured-btn"
              aria-label={`Read article: ${featuredPost.title}`}
            >
              Read Article
            </Link>
          </div>
        </article>
      )}

      {!loading && !error && otherPosts.length > 0 && (
        <>
          <div className="section-header">
            <h3 className="section-title">Latest Articles</h3>
            <button
              type="button"
              className="view-all-link"
              onClick={showAllArticles}
            >
              View All Articles
            </button>
          </div>
          <BlogList posts={visiblePosts} />
        </>
      )}

      <Newsletter />

      <ChatBot flow={flowSteps} settings={chatSettings} />
    </div>
  );
};

export default Home;
