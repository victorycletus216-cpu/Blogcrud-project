import React, { useState } from "react";

// Shows the post image.
// If the URL is missing or broken, a neat letter placeholder is shown instead,
// so visitors never see a broken image icon.
const PostImage = ({ src, title }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="post-image-fallback" aria-hidden="true">
        {title ? title.charAt(0).toUpperCase() : "T"}
      </div>
    );
  }

  return <img src={src} alt={title} onError={() => setFailed(true)} />;
};

export default PostImage;
