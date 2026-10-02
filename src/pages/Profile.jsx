import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Calendar, Shield, Package,
  LogOut, Heart, ShoppingCart, MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/formatCurrency';

export default function Profile() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { getOrdersByUser } = useOrders();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const myOrders = getOrdersByUser(currentUser.email);
  const totalSpent = myOrders.reduce((s, o) => s + (o.totals?.total || 0), 0);
  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">My Account</span>
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="profile-layout">
        {/* Sidebar card */}
        <aside className="profile-side card">
          <div className="profile-avatar">{initials}</div>
          <h3 className="profile-name">{currentUser.name}</h3>
          <p className="profile-email text-xs text-gray">{currentUser.email}</p>

          <span className={`badge ${isAdmin ? 'badge-red' : 'badge-yellow'} profile-role`}>
            <Shield size={12} /> {currentUser.role}
          </span>

          <div className="profile-quick">
            <Link to="/cart" className="profile-quick-item">
              <ShoppingCart size={16} />
              <span>Cart</span>
              <strong>{cartCount}</strong>
            </Link>
            <Link to="/wishlist" className="profile-quick-item">
              <Heart size={16} />
              <span>Wishlist</span>
              <strong>{wishlistCount}</strong>
            </Link>
            <Link to="/orders" className="profile-quick-item">
              <Package size={16} />
              <span>Orders</span>
              <strong>{myOrders.length}</strong>
            </Link>
          </div>

          {isAdmin && (
            <Link to="/admin" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
              Open Admin Dashboard
            </Link>
          )}

          <button
            className="btn btn-outline profile-logout"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={16} /> Logout
          </button>
        </aside>

        {/* Main */}
        <div className="profile-main">
          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-card card">
              <Package size={20} />
              <div>
                <p className="stat-value">{myOrders.length}</p>
                <p className="stat-label">Total Orders</p>
              </div>
            </div>
            <div className="stat-card card">
              <ShoppingCart size={20} />
              <div>
                <p className="stat-value">{formatINR(totalSpent)}</p>
                <p className="stat-label">Total Spent</p>
              </div>
            </div>
            <div className="stat-card card">
              <Heart size={20} />
              <div>
                <p className="stat-value">{wishlistCount}</p>
                <p className="stat-label">Wishlist</p>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div className="card profile-info-card">
            <h3 className="profile-section-title">Account Information</h3>
            <div className="info-row">
              <User size={16} />
              <div>
                <p className="text-xs text-gray">Full Name</p>
                <p className="fw-bold">{currentUser.name}</p>
              </div>
            </div>
            <div className="info-row">
              <Mail size={16} />
              <div>
                <p className="text-xs text-gray">Email</p>
                <p className="fw-bold">{currentUser.email}</p>
              </div>
            </div>
            <div className="info-row">
              <Phone size={16} />
              <div>
                <p className="text-xs text-gray">Phone</p>
                <p className="fw-bold">{currentUser.phone || '—'}</p>
              </div>
            </div>
            <div className="info-row">
              <Shield size={16} />
              <div>
                <p className="text-xs text-gray">Role</p>
                <p className="fw-bold">{currentUser.role}</p>
              </div>
            </div>
            <div className="info-row">
              <Calendar size={16} />
              <div>
                <p className="text-xs text-gray">Member Since</p>
                <p className="fw-bold">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="card profile-info-card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 className="profile-section-title" style={{ margin: 0 }}>
                Recent Orders
              </h3>
              <Link to="/orders" className="btn-text-link">View All →</Link>
            </div>

            {myOrders.length === 0 ? (
              <div className="empty-inline">
                <MapPin size={28} />
                <p className="text-gray">No orders yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
              </div>
            ) : (
              <div className="mini-orders">
                {myOrders.slice(0, 3).map((o) => (
                  <div className="mini-order" key={o.id}>
                    <div>
                      <p className="fw-bold text-xs">{o.id}</p>
                      <p className="text-xs text-gray">
                        {new Date(o.createdAt).toLocaleDateString('en-IN')} •{' '}
                        {o.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="fw-black text-red">{formatINR(o.totals.total)}</p>
                      <span className="badge badge-yellow text-xs">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}