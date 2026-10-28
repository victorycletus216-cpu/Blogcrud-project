// Rough reading time for an article.
// Most people read about 200 words per minute, so we count the words
// and divide by 200. Very short articles still show "1 min read".
const readingTime = (text) => {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

export default readingTime;
