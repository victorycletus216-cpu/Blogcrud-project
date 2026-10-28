import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load the current post details into the form
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setTitle(data.title);
        setBody(data.body);
        setImageUrl(data.imageUrl);
        setAuthor(data.author);
        setCategory(data.category);
        // Keep the original publication date unless the editor changes it
        setDate(data.date || "");
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Could not load this post. It may have been deleted.");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      body,
      imageUrl,
      author,
      category,
      date: date || new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      navigate("/admin/manage-posts", {
        state: { flash: "Article updated successfully." },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Could not update the post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: "600px" }}>
      <h2>Edit Article</h2>
      <p className="form-hint">Fields marked with * are required.</p>

      {error && <div className="feedback feedback-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="post-title">
          Title <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-body">
          Content <span className="required-star" aria-hidden="true">*</span>
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ height: "200px" }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-image">Image URL</label>
        <input
          id="post-image"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-author">
          Author <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="post-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-category">Category</label>
        <input
          id="post-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="For example: Travel, Culture"
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-date">
          Publication date{" "}
          <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="post-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          Update Article
        </button>
        <Link to="/admin/manage-posts" className="btn btn-outline">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EditPost;
