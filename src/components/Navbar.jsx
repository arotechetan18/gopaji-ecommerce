import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu, X, Search, Heart, ShoppingCart, User, LogOut, LayoutDashboard,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { currentUser, logout, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/shop?search=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setQ('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner container">
          <Link to="/" className="navbar-brand" aria-label="Gopaji Home">
            <span className="brand-mark" aria-hidden="true">G</span>
            <span className="brand-text">GOPAJI</span>
          </Link>

          <nav className="navbar-links" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions">
            <button
              className="nav-icon-btn"
              aria-label="Search"
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
            >
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="nav-badge">{wishlistCount}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </Link>

            {currentUser ? (
              <div className="nav-user">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="nav-icon-btn"
                    aria-label="Admin Dashboard"
                    title="Admin"
                  >
                    <LayoutDashboard size={20} />
                  </Link>
                )}
                <Link to="/profile" className="nav-icon-btn" aria-label="Profile">
                  <User size={20} />
                </Link>
                <button
                  className="nav-icon-btn"
                  onClick={logout}
                  aria-label="Logout"
                  type="button"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary nav-login-btn">
                Login
              </Link>
            )}

            <button
              className="nav-icon-btn nav-hamburger"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              type="button"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="navbar-search-panel">
            <form onSubmit={handleSearch} className="container">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search chips, flavors, combos…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
                aria-label="Search products"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
        )}
      </header>

      <div className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer-backdrop" onClick={() => setOpen(false)} />
        <nav className="mobile-drawer-panel" aria-label="Mobile">
          <div className="mobile-drawer-header">
            <span className="brand-text">GOPAJI</span>
            <button
              className="nav-icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={22} />
            </button>
          </div>
          <ul className="mobile-links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `mobile-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {currentUser && (
              <li>
                <NavLink
                  to="/orders"
                  className="mobile-link"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className="mobile-link"
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <div className="mobile-drawer-footer">
            {currentUser ? (
              <button
                className="btn btn-outline"
                onClick={() => { logout(); setOpen(false); }}
                style={{ width: '100%' }}
                type="button"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary"
                onClick={() => setOpen(false)}
                style={{ width: '100%' }}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}