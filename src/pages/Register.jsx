import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name is too short';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';

    if (form.phone && !/^[0-9]{10}$/.test(form.phone))
      e.phone = 'Enter a 10-digit mobile number';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';

    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = register({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
    setSubmitting(false);
    if (res.ok) navigate('/', { replace: true });
  };

  return (
    <div className="auth-wrap">
      <aside className="auth-side">
        <div className="auth-side-inner">
          <span className="brand-mark lg">G</span>
          <h2>Join the<br />GOPAJI family</h2>
          <p className="auth-side-tag">"Crunchy Taste, Made with Love"</p>
          <ul className="auth-side-points">
            <li>🎉 Exclusive combo offers</li>
            <li>💛 Save your wishlist</li>
            <li>📦 Track your orders</li>
          </ul>
        </div>
      </aside>

      <div className="auth-main">
        <div className="auth-card">
          <span className="eyebrow">Register</span>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">
            Already registered? <Link to="/login" className="text-red fw-bold">Login here</Link>
          </p>

          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="input-icon">
                <User size={16} />
                <input
                  id="name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="r-email">Email</label>
                <div className="input-icon">
                  <Mail size={16} />
                  <input
                    id="r-email"
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
                <label className="form-label" htmlFor="r-phone">Phone (optional)</label>
                <div className="input-icon">
                  <Phone size={16} />
                  <input
                    id="r-phone"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })
                    }
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="r-pwd">Password</label>
                <div className="input-icon">
                  <Lock size={16} />
                  <input
                    id="r-pwd"
                    type={showPwd ? 'text' : 'password'}
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="new-password"
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

              <div className="form-group">
                <label className="form-label" htmlFor="r-cnf">Confirm Password</label>
                <div className="input-icon">
                  <Lock size={16} />
                  <input
                    id="r-cnf"
                    type={showPwd ? 'text' : 'password'}
                    className={`form-input ${errors.confirm ? 'input-error' : ''}`}
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirm && <p className="form-error">{errors.confirm}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={submitting}
            >
              {submitting ? 'Creating account…' : 'CREATE ACCOUNT'}
            </button>

            <p className="auth-terms">
              By registering, you agree to Gopaji's Terms &amp; Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}