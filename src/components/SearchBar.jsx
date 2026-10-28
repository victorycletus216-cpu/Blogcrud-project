import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

// Header search: a magnifying-glass button that opens a small panel.
// Articles are loaded from the existing API the first time the panel opens,
// and filtered by title, category, author or body text.
const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Close the panel whenever the page changes (for example after
  // the visitor clicks one of the results)
  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [location]);

  // Load all articles once, the first time the panel is opened
  useEffect(() => {
    if (!open || posts.length > 0) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error("Failed to load articles");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error loading articles for search:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [open, posts.length]);

  // Also opened by the "View All Articles" link on the home page
  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener("open-article-search", openPanel);
    return () => window.removeEventListener("open-article-search", openPanel);
  }, []);

  const searchText = query.trim().toLowerCase();
  const results = searchText
    ? posts.filter((post) =>
        [post.title, post.category, post.author, post.body].some((field) =>
          (field || "").toLowerCase().includes(searchText)
        )
      )
    : posts;

  const MAX_RESULTS = 8;
  const visibleResults = results.slice(0, MAX_RESULTS);

  return (
    <div className="search">
      <button
        type="button"
        className="search-toggle"
        aria-label="Search articles"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {open && (
        <div className="search-panel">
          <label className="search-label" htmlFor="site-search">
            Search articles
          </label>
          <div className="search-row">
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, category or author"
              autoFocus
            />
            <button
              type="button"
              className="search-close"
              aria-label="Close search"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="search-results" aria-live="polite">
            {loading && <p className="search-note">Loading articles...</p>}

            {!loading && results.length === 0 && (
              <p className="search-note">No articles match your search.</p>
            )}

            {!loading && results.length > 0 && (
              <>
                {!searchText && (
                  <p className="search-note">All articles</p>
                )}
                <ul>
                  {visibleResults.map((post) => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                      {post.category && (
                        <span className="search-result-category">
                          {post.category}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {results.length > visibleResults.length && (
                  <p className="search-note">
                    Showing {visibleResults.length} of {results.length}{" "}
                    matches. Keep typing to narrow down.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
