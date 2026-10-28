import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand-name">The Daily Edit</span>
        <span className="admin-brand-sub">Admin area</span>
      </div>

      <nav aria-label="Admin navigation">
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-posts"
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              Manage Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-post"
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              Create Article
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-users"
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="admin-nav-link">
              View Website
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
