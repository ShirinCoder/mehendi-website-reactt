import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-right">
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
