import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to MEMY.np</h1>
      <p className="home-subtitle">
        Your one-stop online shop for the best products in Nepal.
      </p>

      <div className="features-grid">
        <div className="feature-box">
          <h2 className="feature-title">Quality Products</h2>
          <p>We offer top-quality products carefully selected for you.</p>
        </div>
        <div className="feature-box">
          <h2 className="feature-title">Fast Delivery</h2>
          <p>Get your orders delivered quickly across Nepal.</p>
        </div>
        <div className="feature-box">
          <h2 className="feature-title">Customer Support</h2>
          <p>24/7 friendly support to help you with your shopping.</p>
        </div>
      </div>

      <div className="cta-wrapper">
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
