// Turns a date like "2025-10-25" into "October 25, 2025".
// If the date is missing or invalid, it returns an empty string.
const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // new Date("invalid text") gives an Invalid Date object
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;
