import React from "react";
import "../style/about.css"; // Make sure to create this CSS file

function About() {
  return (
    <div className="about-container">
      <h1>About <span className="highlight">memy.np</span></h1>
      <p>
        Welcome to <strong>memy.np</strong> – your trusted online destination for discovering, exploring, and shopping products across a wide range of categories. Whether you're searching for daily essentials, trending items, or unique finds, <strong>memy.np</strong> is designed to make your shopping journey easier, faster, and more enjoyable.
      </p>

      <h2>Who We Are</h2>
      <p>
        At <strong>memy.np</strong>, we believe shopping should be simple, secure, and satisfying. We are a Nepal-based eCommerce platform committed to providing a user-friendly experience that connects buyers and sellers across the country. Our goal is to empower users with a seamless online shopping environment tailored for both convenience and value.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>🛒 <strong>Diverse Product Categories:</strong> Fashion, electronics, home goods, and more — all in one place.</li>
        <li>⚡ <strong>Fast & Secure Checkout:</strong> Simplified and protected transactions every time.</li>
        <li>📱 <strong>Responsive Design:</strong> Enjoy a smooth experience on mobile, tablet, or desktop.</li>
        <li>🤝 <strong>Reliable Customer Service:</strong> We’re here to help, every step of the way.</li>
        <li>🧰 <strong>Smart Cart & Account Tools:</strong> Efficient management of your orders and profile.</li>
      </ul>

      <h2>Why Choose memy.np?</h2>
      <ul>
        <li>🇳🇵 Local platform built specifically for the <strong>Nepali market</strong></li>
        <li>💰 Transparent pricing with <strong>no hidden charges</strong></li>
        <li>⏱ Commitment to <strong>quality, trust, and timely delivery</strong></li>
        <li>🌟 A growing <strong>community of happy customers and sellers</strong></li>
      </ul>

      <p className="thankyou">
        Thank you for choosing <strong>memy.np</strong>. Let’s build the future of Nepali eCommerce together!
      </p>
    </div>
  );
}

export default About;
