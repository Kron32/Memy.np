
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">MEMY.np</h2>
          <p className="text-sm">Your trusted e-commerce partner in Nepal.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Shop</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@memy.np</p>
          <p className="text-sm">Phone: +977-9800000000</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        &copy; {new Date().getFullYear()} MEMY.np. All rights reserved.
      </div>
    </footer>
  );
}
