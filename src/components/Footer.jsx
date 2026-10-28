import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <p className="footer-name">The Daily Edit</p>
      <p className="footer-tagline">Stories, Ideas &amp; Inspiration.</p>

      <nav className="footer-nav" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <Link to="/admin/dashboard">Admin</Link>
      </nav>

      <p className="footer-credit">Created by Victory</p>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} The Daily Edit. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
