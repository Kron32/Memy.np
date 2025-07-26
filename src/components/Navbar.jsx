import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import '../style/Navbar.css';
import SearchBar from '../pages/searchbar'; // ✅ Adjust path as needed

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchbar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🛒 memy.np
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link> {/* ✅ Contact page link */}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </form>

        {/* Right Side */}
        <div className="nav-right">
          <Link to="/cart" className="nav-cart">
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
          </Link>
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/your-order" className="nav-login">Your Order</Link>
        </div>
      </div>
    </nav>
  );
}
