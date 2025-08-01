import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/YourOrder.css';

export default function YourOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdersWithFallbackImage = async () => {
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

      const detailedOrders = await Promise.all(
        savedOrders.map(async (order) => {
          if (order.thumbnail && order.title) {
            return order;
          }
          try {
            const res = await fetch(`https://dummyjson.com/products/${order.id}`);
            const productData = await res.json();
            return {
              ...order,
              title: order.title || productData.title,
              thumbnail: order.thumbnail || productData.thumbnail,
            };
          } catch (err) {
            console.error(`Failed to fetch product ${order.id}`, err);
            return {
              ...order,
              title: order.title || 'Product unavailable',
              thumbnail: order.thumbnail || '',
            };
          }
        })
      );

      setOrders(detailedOrders);
      setLoading(false);
    };

    fetchOrdersWithFallbackImage();
  }, []);

  const handleClearOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders?')) {
      localStorage.removeItem('orders');
      setOrders([]);
    }
  };

  const formatCurrency = (num) => {
    return Number(num).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getTotalPrice = () => {
    const total = orders.reduce((sum, order) => {
      const price = Number(order.price) || 0;
      const quantity = Number(order.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    return formatCurrency(total);
  };

  if (loading) return <p className="loading">Loading your orders...</p>;

  if (orders.length === 0) {
    return (
      <div className="orders-container empty">
        <h2>Your Orders</h2>
        <p>🛒 You have no orders yet.</p>
        <button className="back-btn" onClick={() => navigate('/')}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders ({orders.length})</h2>
      <div className="orders-summary">
        <p>Total Price: <strong>Rs. {getTotalPrice()}</strong></p>
        <button className="clear-orders-btn" onClick={handleClearOrders}>
          Clear All Orders
        </button>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <img
              src={order.thumbnail || 'https://via.placeholder.com/120'}
              alt={order.title}
              className="order-image"
            />
            <div className="order-details">
              <h3>{order.title}</h3>
              <p>Price: Rs. {formatCurrency(order.price)}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: Rs. {formatCurrency(Number(order.price) * Number(order.quantity))}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>Order Date: {new Date(order.date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
