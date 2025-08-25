import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper" style={{ padding: '0 20px' }}>
        <NavLink to="/" className="brand-logo left">Logo</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/" end>InterviewList</NavLink>
          </li>
          <li>
            <NavLink to="/create">Creation</NavLink>
          </li>
          <li>
            <NavLink to="/add-user">Add User</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
