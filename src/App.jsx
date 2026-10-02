import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const Coming = ({ name }) => (
  <div className="container section text-center">
    <span className="eyebrow">Coming Next</span>
    <h1>{name}</h1>
    <p className="text-gray">This page will be built in the next step.</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="about" element={<Coming name="About" />} />
        <Route path="contact" element={<Coming name="Contact" />} />

        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute><Coming name="My Orders" /></ProtectedRoute>} />
        <Route path="checkout" element={<ProtectedRoute><Coming name="Checkout" /></ProtectedRoute>} />
        <Route path="order-success" element={<ProtectedRoute><Coming name="Order Success" /></ProtectedRoute>} />

        <Route path="admin" element={<AdminRoute><Coming name="Admin Dashboard" /></AdminRoute>} />

        <Route path="*" element={<Coming name="404 — Not Found" />} />
      </Route>
    </Routes>
  );
}