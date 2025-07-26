import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const updatedQuantity = Math.max(1, Number(quantity));
        return {
          ...item,
          quantity: updatedQuantity,
          total: updatedQuantity * item.price
        };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const filtered = cart.filter(item => item.id !== id);
    setCart(filtered);
    localStorage.setItem('cart', JSON.stringify(filtered));
  };

  const clearCart = () => {
    if (window.confirm('Clear all items from cart?')) {
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  const placeOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrders = cart.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      paymentMethod: 'COD',
      date: new Date().toISOString()
    }));

    localStorage.setItem('orders', JSON.stringify([...existingOrders, ...newOrders]));
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/your-order');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        <p>No items in cart.</p>
        <button onClick={() => navigate('/')}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Price: Rs. {item.price}</p>
            <div className="cart-quantity">
              <label>Qty:</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => updateQuantity(item.id, e.target.value)}
              />
            </div>
            <p><strong>Total: Rs. {item.price * item.quantity}</strong></p>
          </div>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <div className="total-amount">Grand Total: Rs. {totalAmount}</div>

      <div className="cart-actions">
        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
