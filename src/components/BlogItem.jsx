import React from "react";
import { Link } from "react-router-dom";
import PostImage from "./PostImage";
import formatDate from "../formatDate";
import readingTime from "../readingTime";

const BlogItem = ({ post }) => {
  // Show the first 100 characters of the body as a short excerpt.
  // Guard against posts that have no body text.
  const body = post.body || "";
  const excerpt =
    body.length > 100 ? body.substring(0, 100).trim() + "..." : body;

  // "October 25, 2025 · 1 min read" (only the parts that exist)
  const meta = [post.date ? formatDate(post.date) : "", readingTime(body)]
    .filter(Boolean)
    .join(" \u00b7 ");

  return (
    <article className="blog-item">
      <PostImage src={post.imageUrl} title={post.title} />
      <div className="blog-item-content">
        {post.category && <span className="category-label">{post.category}</span>}
        <h2>{post.title}</h2>
        {excerpt && <p>{excerpt}</p>}
        <div className="post-meta">{meta}</div>
        <Link
          to={`/post/${post.id}`}
          className="btn btn-small"
          aria-label={`Read More: ${post.title}`}
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogItem;
