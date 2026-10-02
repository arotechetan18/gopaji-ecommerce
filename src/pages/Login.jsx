import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = login(form);
    setSubmitting(false);
    if (res.ok) navigate(from, { replace: true });
  };

  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@gopaji.com', password: 'admin123' });
    else setForm({ email: 'user@gopaji.com', password: 'user123' });
    setErrors({});
  };

  return (
    <div className="auth-wrap">
      {/* Left brand panel */}
      <aside className="auth-side">
        <div className="auth-side-inner">
          <span className="brand-mark lg">G</span>
          <h2>Welcome back to<br />GOPAJI</h2>
          <p className="auth-side-tag">"Crunchy Taste, Made with Love"</p>
          <ul className="auth-side-points">
            <li>✅ Fast doorstep delivery</li>
            <li>✅ Free delivery above ₹499</li>
            <li>✅ Fresh from Maharashtra</li>
          </ul>
        </div>
      </aside>

      {/* Form */}
      <div className="auth-main">
        <div className="auth-card">
          <span className="eyebrow">Login</span>
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-sub">
            Don't have an account? <Link to="/register" className="text-red fw-bold">Register here</Link>
          </p>

          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-icon">
                <Mail size={16} />
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-icon">
                <Lock size={16} />
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={submitting}
            >
              {submitting ? 'Signing in…' : 'SIGN IN'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="demo-box">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-row">
              <span>👤 User</span>
              <code>user@gopaji.com / user123</code>
              <button type="button" className="demo-fill" onClick={() => fillDemo('user')}>
                Fill
              </button>
            </div>
            <div className="demo-row">
              <span>👑 Admin</span>
              <code>admin@gopaji.com / admin123</code>
              <button type="button" className="demo-fill" onClick={() => fillDemo('admin')}>
                Fill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}