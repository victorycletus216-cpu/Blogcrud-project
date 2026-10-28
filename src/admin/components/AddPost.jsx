import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  // The database already stores a publication date for every article,
  // so the field starts filled with today and can be changed.
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title,
      body,
      imageUrl,
      author,
      category,
      date: date || new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      navigate("/admin/manage-posts", {
        state: { flash: "Article published successfully." },
      });
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Could not save the post. Please check that the API server is running and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: "600px" }}>
      <h2>Create Article</h2>
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
          placeholder="Give your article a clear headline"
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
          placeholder="Write the full article text"
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
          placeholder="Who wrote this article"
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
          Publish Article
        </button>
        <Link to="/admin/manage-posts" className="btn btn-outline">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default AddPost;
