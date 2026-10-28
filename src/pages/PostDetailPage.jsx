import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostImage from "../components/PostImage";
import formatDate from "../formatDate";
import API_BASE_URL from "../apiConfig";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        // json-server returns 404 for an id that does not exist
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>

      {loading && (
        <div className="loading-state">
          <p>Loading article...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-state">
          <h2>Post not found</h2>
          <p>Sorry, we could not find that article. It may have been removed.</p>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      )}

      {post && (
        <article className="post-detail">
          <PostImage src={post.imageUrl} title={post.title} />
          <div className="post-detail-content">
            {post.category && <div className="post-category">{post.category}</div>}
            <h1>{post.title}</h1>
            <div className="author">
              {post.author && <span>By {post.author}</span>}
              {post.author && post.date && <span> &middot; </span>}
              {post.date && <span>{formatDate(post.date)}</span>}
            </div>
            <div className="post-body">
              <p>{post.body}</p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostDetailPage;
