// src/pages/PageNotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <p>This page is not found</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
}
