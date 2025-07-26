
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import About from './pages/about';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import PageNotFound from './PageNotFound';
import YourOrder from './pages/YourOrder';
import Login from './pages/Login';
import SearchBar from './pages/searchbar';
import Contact from './pages/contact';

;

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navbar />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/your-order" element={<YourOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchbar"element={<SearchBar/>}/>
        <Route path="/contact" element={<Contact />} />
     
      </Routes>
    
  );
}

   