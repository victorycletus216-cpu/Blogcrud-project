import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="brand">
          <span className="logo">The Daily Edit</span>
          <span className="tagline">Stories, Ideas &amp; Inspiration.</span>
        </Link>
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/admin/dashboard">Admin</Link>
          </div>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
