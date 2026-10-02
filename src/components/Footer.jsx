import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import { BRAND } from '../utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Brand column */}
        <div className="footer-col footer-brand">
          <div className="flex" style={{ alignItems: 'center', gap: '0.55rem' }}>
            <span className="brand-mark">G</span>
            <span className="brand-text" style={{ color: '#fff' }}>GOPAJI</span>
          </div>
          <p className="footer-tagline">"{BRAND.tagline}"</p>
          <p className="footer-company">{BRAND.company}</p>
          <p className="footer-address flex" style={{ gap: '0.4rem', marginTop: '0.5rem' }}>
            <MapPin size={14} /> {BRAND.location}
          </p>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Support</h4>
          <ul className="footer-links">
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* Leadership */}
        <div className="footer-col">
          <h4 className="footer-heading">Leadership</h4>
          <p className="footer-text">
            <strong>CEO</strong><br />{BRAND.ceo}
          </p>
          <p className="footer-text" style={{ marginTop: '0.75rem' }}>
            <strong>Co-Founder</strong><br />{BRAND.coFounder}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container flex-between footer-bottom-inner">
          <p className="text-xs">
            © {year} {BRAND.company}. All Rights Reserved.
          </p>
          <p className="text-xs flex" style={{ alignItems: 'center', gap: '0.35rem' }}>
            Made with <Heart size={12} fill="#C8102E" color="#C8102E" /> in Maharashtra, India
          </p>
        </div>
      </div>
    </footer>
  );
}