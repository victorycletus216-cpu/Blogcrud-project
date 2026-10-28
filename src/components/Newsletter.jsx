import React, { useState } from "react";

// Newsletter banner at the bottom of the home page.
// No mailing-list service is connected to this project, so the form only
// checks the email and gives honest feedback - nothing is stored anywhere.
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setNote("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Simple email check: something@something.something
    const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!looksValid) {
      setError(
        "Please enter a valid email address, for example name@example.com."
      );
      return;
    }

    // No subscription service exists yet, so we say that plainly.
    setNote(
      "Thanks! Your email address looks good, but no mailing service is connected to this site yet, so nothing was saved."
    );
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <div className="newsletter-inner">
        <h2 id="newsletter-heading">Never miss a story</h2>
        <p>Get our newest articles and ideas delivered straight to your inbox.</p>

        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter-field">
            <label htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "newsletter-message" : undefined}
            />
          </div>
          <button type="submit" className="btn">
            Subscribe
          </button>
        </form>

        {error && (
          <p id="newsletter-message" className="newsletter-error" role="alert">
            {error}
          </p>
        )}

        {!error && note && (
          <p id="newsletter-message" className="newsletter-note" role="status">
            {note}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
