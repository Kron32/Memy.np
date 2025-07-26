import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/productdetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [codChecked, setCodChecked] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));

    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data =>
        setSuggestions(data.products.filter(p => p.id !== parseInt(id)).slice(0, 4))
      );
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (!existing) {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
      navigate('/cart');
    } else {
      alert('Product already in cart');
    }
  };

  const openOrderModal = () => {
    setShowOrderModal(true);
    setOrderPlaced(false);
    setQuantity(1);
    setCodChecked(true);
  };

  const handleYourOrder = () => {
    if (!codChecked) {
      alert('Please select Cash on Delivery (COD).');
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
      id: product.id,           // Only product ID
      quantity,                 // Chosen quantity
      paymentMethod: 'COD',
      date: new Date().toISOString()
    };

    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    setOrderPlaced(true);

    setTimeout(() => {
      setShowOrderModal(false);
      navigate('/your-order');
    }, 1000);
  };

  if (!product) return <p className="loading">Loading product...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.thumbnail} alt={product.title} />
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p className="price">Rs. {product.price}</p>
          <p>{product.description}</p>

          <div className="button-group">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={openOrderModal}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <h3 className="suggest-heading">You may also like</h3>
      <div className="suggestions-grid">
        {suggestions.map(item => (
          <div
            key={item.id}
            className="suggestion-card"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
            <p className="suggest-price">Rs. {item.price}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {!orderPlaced ? (
              <>
                <h2>Place Your Order</h2>
                <img src={product.thumbnail} alt={product.title} className="modal-img" />
                <p><strong>{product.title}</strong></p>
                <p>Unit Price: Rs. {product.price}</p>

                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                  />
                </label>

                <p><strong>Total: Rs. {product.price * quantity}</strong></p>

                <label className="cod-checkbox">
                  <input
                    type="checkbox"
                    checked={codChecked}
                    onChange={e => setCodChecked(e.target.checked)}
                  />
                  Cash on Delivery (COD)
                </label>

                <div className="modal-button-group">
                  <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button className="buy-now" onClick={handleYourOrder}>
                    Place Order
                  </button>
                </div>

                <button className="cancel-btn" onClick={() => setShowOrderModal(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <div className="order-confirmation">
                <h3>Thank you!</h3>
                <p>Your order has been placed successfully.</p>
                <button onClick={() => setShowOrderModal(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
