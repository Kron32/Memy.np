import React, { useEffect, useState } from 'react';
import '../style/Product.css';
import { Link } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(12); // products per page
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial products
  useEffect(() => {
    fetchProducts(0);
  }, []);

  // Fetch products with pagination
  const fetchProducts = (skipValue) => {
    if (skipValue === 0) setLoading(true);
    else setLoadingMore(true);

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skipValue}`)
      .then(res => res.json())
      .then(data => {
        if (skipValue === 0) {
          setProducts(data.products);
        } else {
          setProducts(prev => [...prev, ...data.products]);
        }
        setTotal(data.total);
        setSkip(skipValue + limit);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const handleShowMore = () => {
    fetchProducts(skip);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">All Products</h1>

      {loading && <p className="text-center text-gray-500">Loading products...</p>}

      <div className="product-grid">
        {products.map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card-link"
          >
            <div className="product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-img"
              />
              <div className="product-info">
                <h2 className="product-name">{product.title}</h2>
                <p className="product-category">{product.category}</p>
                <p className="product-price">Rs. {product.price}</p>
                <p className="product-desc">
                  {product.description.length > 60
                    ? product.description.slice(0, 60) + '...'
                    : product.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!loading && products.length < total && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={handleShowMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
}
