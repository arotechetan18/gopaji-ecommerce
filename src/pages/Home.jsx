import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, Sparkles, Leaf, Factory, Truck,
  Mail, CheckCircle,
} from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { advertisements } from '../data/advertisements';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ProductPacket from '../components/ProductPacket';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { storage, KEYS } from '../utils/storage';
import { formatINR } from '../utils/formatCurrency';
import { BRAND } from '../utils/constants';

export default function Home() {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = useMemo(() => products.filter((p) => p.isFeatured).slice(0, 6), []);
  const bestSellers = useMemo(() => products.filter((p) => p.isBestSeller).slice(0, 4), []);
  const combos = useMemo(
    () => products.filter((p) => p.category === 'combo-packs' || p.category === 'family-packs').slice(0, 3),
    []
  );
  const adsEnabled = advertisements.filter((a) => a.enabled);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    const subs = storage.get(KEYS.SUBSCRIPTIONS, []);
    if (subs.includes(email)) {
      toast.info('You are already subscribed!');
      setSubscribed(true);
      return;
    }
    storage.set(KEYS.SUBSCRIPTIONS, [...subs, email]);
    setSubscribed(true);
    toast.success('Subscribed! Welcome to the Gopaji crunch club.');
    setEmail('');
  };

  return (
    <div className="home">
      {/* ==================== 1. HERO ==================== */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="eyebrow">Gopaji Industries presents</span>
            <h1 className="hero-title">
              CRUNCH INTO<br />
              <span className="hero-title-accent">HAPPINESS</span>
            </h1>
            <p className="hero-sub">
              Gopaji Chips — {BRAND.tagline}.
            </p>

            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary hero-cta">
                SHOP NOW <ArrowRight size={18} />
              </Link>
              <Link to="/categories" className="btn btn-outline hero-cta">
                EXPLORE PRODUCTS
              </Link>
            </div>

            <div className="hero-trust">
              <div><strong>10+</strong><span>Flavors</span></div>
              <div className="hero-trust-divider" />
              <div><strong>₹20</strong><span>Starting price</span></div>
              <div className="hero-trust-divider" />
              <div><strong>FREE</strong><span>Delivery ₹499+</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-packet hero-packet-1 float-anim">
              <ProductPacket
                name="Masala Magic"
                flavor="Masala Magic"
                weight="52g"
                mrp={25}
                colors={{ from: '#C8102E', to: '#7A0A1C', accent: '#FFC72C' }}
                size="lg"
              />
            </div>
            <div className="hero-packet hero-packet-2 float-anim" style={{ animationDelay: '1.2s' }}>
              <ProductPacket
                name="Classic Salted"
                flavor="Classic Salted"
                weight="52g"
                mrp={25}
                colors={{ from: '#FFC72C', to: '#E0A800', accent: '#C8102E' }}
                size="md"
              />
            </div>
            <div className="hero-packet hero-packet-3 float-anim" style={{ animationDelay: '0.6s' }}>
              <ProductPacket
                name="Peri Peri"
                flavor="Peri Peri"
                weight="52g"
                mrp={30}
                colors={{ from: '#FF6B1A', to: '#C8102E', accent: '#FFC72C' }}
                size="md"
              />
            </div>

            {/* floating chips */}
            <span className="hero-chip hero-chip-1" />
            <span className="hero-chip hero-chip-2" />
            <span className="hero-chip hero-chip-3" />
          </div>
        </div>
      </section>

      {/* ==================== 2. PROMO AD ==================== */}
      {adsEnabled[0] && (
        <section className="ad-banner ad-red">
          <div className="container ad-banner-inner">
            <div className="ad-banner-content">
              <span className="ad-eyebrow">Limited Time</span>
              <h2 className="ad-title">{adsEnabled[0].title}</h2>
              <p className="ad-sub">{adsEnabled[0].subtitle}</p>
              <Link to={adsEnabled[0].ctaLink} className="btn btn-secondary ad-cta">
                {adsEnabled[0].cta} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="ad-banner-visual" aria-hidden="true">
              <ProductPacket
                name="Gopaji"
                flavor="Family Pack"
                weight="180g"
                mrp={100}
                colors={{ from: '#FFC72C', to: '#E0A800', accent: '#C8102E' }}
                size="lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* ==================== 3. SHOP BY CATEGORY ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">Explore</span>
            <h2 className="section-title">
              Shop by <span>Category</span>
            </h2>
            <p className="section-sub">
              Find your perfect crunch by flavor and pack type.
            </p>
          </div>

          <div className="category-grid">
            {categories.slice(0, 10).map((c) => (
              <CategoryCard
                key={c.id}
                category={{ ...c, count: products.filter((p) => p.category === c.id).length }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. FEATURED ==================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured</span>
            <h2 className="section-title">
              Our Favorite <span>Crunch</span>
            </h2>
          </div>

          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(prod) => addItem(prod, 1)}
                onToggleWishlist={(prod) => toggle(prod)}
                isWishlisted={isWishlisted(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. BEST SELLERS ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-head flex-between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow">Loved by many</span>
              <h2 className="section-title">
                Best <span>Sellers</span>
              </h2>
            </div>
            <Link to="/shop" className="btn btn-outline">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {bestSellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(prod) => addItem(prod, 1)}
                onToggleWishlist={(prod) => toggle(prod)}
                isWishlisted={isWishlisted(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. COMBO OFFERS ==================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">Save more</span>
            <h2 className="section-title">
              Combo <span>Offers</span>
            </h2>
            <p className="section-sub">
              Bigger packs, better prices — perfect for sharing.
            </p>
          </div>

          <div className="combo-grid">
            {combos.map((p) => {
              const savings = p.mrp - p.price;
              return (
                <div className="combo-card card" key={p.id}>
                  <div className="combo-packet">
                    <ProductPacket
                      name={p.name}
                      flavor={p.flavor}
                      weight={p.weight}
                      mrp={p.mrp}
                      colors={p.packetColors}
                      size="md"
                    />
                  </div>
                  <div className="combo-info">
                    <span className="badge badge-yellow">COMBO</span>
                    <h3 className="combo-name">{p.name}</h3>
                    <p className="text-xs text-gray">{p.flavor} • {p.weight}</p>
                    <div className="combo-price-row">
                      <span className="combo-price">{formatINR(p.price)}</span>
                      <span className="combo-mrp">{formatINR(p.mrp)}</span>
                    </div>
                    <p className="combo-save">You save {formatINR(savings)}</p>
                    <button
                      className="btn btn-primary combo-cta"
                      onClick={() => addItem(p, 1)}
                      type="button"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 7. WHY GOPAJI ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">Why Gopaji</span>
            <h2 className="section-title">
              Made with <span>Love</span>, Packed with Crunch
            </h2>
          </div>

          <div className="why-grid">
            {[
              { icon: <Sparkles size={26} />, title: 'Fresh & Crunchy', text: 'Packed to preserve the crunch you love, every time.' },
              { icon: <Leaf size={26} />, title: 'Quality Ingredients', text: 'Simple ingredients, careful seasoning, real flavor.' },
              { icon: <Factory size={26} />, title: 'Hygienic Manufacturing', text: 'Prepared with care at our Gopaji Industries facility.' },
              { icon: <Truck size={26} />, title: 'Doorstep Convenience', text: 'Delivered fresh to your home — free above ₹499.' },
            ].map((w, i) => (
              <div className="why-card card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 8. BIG AD ==================== */}
      {adsEnabled[1] && (
        <section className="big-ad">
          <div className="container big-ad-inner">
            <div className="big-ad-content">
              <span className="ad-eyebrow" style={{ color: '#FFC72C' }}>Discover</span>
              <h2 className="big-ad-title">{adsEnabled[1].title}</h2>
              <p className="big-ad-sub">{adsEnabled[1].subtitle}</p>
              <Link to={adsEnabled[1].ctaLink} className="btn btn-secondary">
                {adsEnabled[1].cta} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="big-ad-visual" aria-hidden="true">
              <div className="big-ad-packet float-anim">
                <ProductPacket
                  name="Gopaji"
                  flavor="Party Combo"
                  weight="5 x 52g"
                  mrp={125}
                  colors={{ from: '#FF6B1A', to: '#C8102E', accent: '#FFC72C' }}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 9. REVIEWS ==================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">Happy Snackers</span>
            <h2 className="section-title">
              What Our <span>Customers</span> Say
            </h2>
            <p className="section-sub">
              Sample customer reviews — for demonstration only.
            </p>
          </div>

          <div className="reviews-grid">
            {[
              { name: 'Aarav S.', rating: 5, text: 'Love the crunch and the masala flavor!' },
              { name: 'Priya M.', rating: 5, text: 'Great snack for movie nights.' },
              { name: 'Rohan K.', rating: 4, text: 'Fresh, tasty and well packed.' },
            ].map((r, i) => (
              <div className="review-card card" key={i}>
                <div className="review-stars">
                  <Rating value={r.rating} showCount={false} />
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <p className="fw-bold text-sm">{r.name}</p>
                    <p className="text-xs text-gray">Demo review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. NEWSLETTER ==================== */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-content">
            <span className="eyebrow" style={{ color: '#FFC72C' }}>Newsletter</span>
            <h2 className="newsletter-title">GET THE LATEST CRUNCH!</h2>
            <p className="newsletter-sub">
              Subscribe for new flavors, offers and combo deals.
            </p>

            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle size={20} />
                <span>You're subscribed! 🎉</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-secondary">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}