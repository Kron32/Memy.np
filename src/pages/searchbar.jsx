import React, { useState, useEffect, useRef } from 'react';
import '../style/searchbar.css';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const nav=useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    // Debounce API calls by 500ms
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data.products || []);
          setLoading(false);
        })
        .catch(() => {
          setSuggestions([]);
          setLoading(false);
        });
    }, 500);

    // Cleanup timeout on unmount or query change
    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  const handleDetails=(id)=>{
    setSuggestions([])
    setSearchQuery("")
nav(`/product/${id}`)
  }

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading && <div className="searchbar-loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="searchbar-suggestions">
          {suggestions.map(product => (
            
            <li key={product.id} className="searchbar-suggestion-item" onClick={()=>handleDetails(product.id)}>
              <img src={product.thumbnail} alt={product.title} className="searchbar-suggestion-img" />
              <div className="searchbar-suggestion-text">
                <strong>{product.title}</strong>
                <span>Rs. {product.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
