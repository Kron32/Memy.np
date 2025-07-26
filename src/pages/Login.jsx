import React, { useState, useEffect } from 'react';
import '../style/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'memy@gmail.com' && password === 'memy') {
      localStorage.setItem('authToken', 'logged_in_token');
      setMessage('✅ Login Successful!');
      setIsLoggedIn(true);
    } else {
      setMessage('❌ Invalid email or password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <h2 className="login-heading">Welcome, you are logged in!</h2>
        <button onClick={handleLogout} className="login-button">Logout</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
}
