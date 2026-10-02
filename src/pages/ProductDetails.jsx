import { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Heart, ShoppingCart, Zap, Truck, ShieldCheck, RefreshCw,
  ChevronRight, Package, ArrowLeft,
} from 'lucide-react';
import { getProductById, products as allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatINR, calcDiscount } from '../utils/formatCurrency';
import ProductPacket from '../components/ProductPacket';
import ProductCard from '../components/ProductCard';
import Rating from '../components/Rating';
import QuantitySelector from '../components/QuantitySelector';

const TABS = ['Description', 'Ingredients', 'Nutrition', 'Product Info'];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');

  // Reset qty when product changes
  useEffect(() => { setQty(1); setActiveTab('Description'); }, [id]);

  // Related products
  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // ===== Not found =====
  if (!product) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon-wrap"><Package size={44} /></div>
          <h2>Product Not Found</h2>
          <p className="text-gray">
            The product you're looking for doesn't exist or was removed.
          </p>
          <Link to="/shop" className="btn btn-primary mt-3">
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = calcDiscount(product.mrp, product.price);
  const outOfStock = product.stock <= 0;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    addItem(product, qty);
    navigate(isAuthenticated ? '/checkout' : '/login', {
      state: isAuthenticated ? undefined : { from: { pathname: '/checkout' } },
    });
  };

  return (
    <div className="container section">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="pd-layout">
        {/* ===== Left: Gallery ===== */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            <ProductPacket
              name={product.name}
              flavor={product.flavor}
              weight={product.weight}
              mrp={product.mrp}
              colors={product.packetColors}
              size="lg"
            />
          </div>

          {/* Thumbnails = small packet variations */}
          <div className="pd-thumbs">
            {[0.9, 1, 1.1].map((scale, i) => (
              <div
                key={i}
                className={`pd-thumb ${i === 0 ? 'active' : ''}`}
                style={{ transform: `scale(${scale})` }}
              >
                <ProductPacket
                  name={product.name}
                  flavor={product.flavor}
                  weight={product.weight}
                  mrp={product.mrp}
                  colors={product.packetColors}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right: Info ===== */}
        <div className="pd-info">
          <span className="eyebrow">{product.flavor}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            <Rating value={product.rating} count={product.reviewCount} size={16} />
            <span className="text-xs text-gray">• {product.weight}</span>
          </div>

          {/* Price block */}
          <div className="pd-price-block">
            <span className="pd-price">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="pd-mrp">{formatINR(product.mrp)}</span>
                <span className="badge badge-red">-{discount}% OFF</span>
              </>
            )}
          </div>
          <p className="text-xs text-gray">Inclusive of all taxes</p>

          {/* Stock */}
          <div className="pd-stock">
            {outOfStock ? (
              <span className="badge badge-orange">OUT OF STOCK</span>
            ) : product.stock < 20 ? (
              <span className="badge badge-yellow">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="badge badge-success">IN STOCK</span>
            )}
          </div>

          {/* Description short */}
          <p className="pd-desc">{product.description}</p>

          {/* Qty + Actions */}
          <div className="pd-actions">
            <div className="pd-qty">
              <span className="text-xs fw-bold text-gray">QUANTITY</span>
              <QuantitySelector
                value={qty}
                onChange={setQty}
                max={Math.min(product.stock, 10)}
                size="lg"
              />
            </div>

            <div className="pd-buttons">
              <button
                className="btn btn-primary pd-btn"
                disabled={outOfStock}
                onClick={handleAddToCart}
                type="button"
              >
                <ShoppingCart size={18} /> ADD TO CART
              </button>
              <button
                className="btn btn-secondary pd-btn"
                disabled={outOfStock}
                onClick={handleBuyNow}
                type="button"
              >
                <Zap size={18} /> BUY NOW
              </button>
              <button
                className={`pd-wishlist ${wishlisted ? 'active' : ''}`}
                onClick={() => toggle(product)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                type="button"
              >
                <Heart
                  size={20}
                  fill={wishlisted ? '#C8102E' : 'transparent'}
                  color={wishlisted ? '#C8102E' : '#2B2B2B'}
                />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="pd-trust">
            <div className="pd-trust-item">
              <Truck size={18} />
              <div>
                <p className="fw-bold text-xs">Free Delivery</p>
                <p className="text-xs text-gray">On orders above ₹499</p>
              </div>
            </div>
            <div className="pd-trust-item">
              <ShieldCheck size={18} />
              <div>
                <p className="fw-bold text-xs">Hygienic Packing</p>
                <p className="text-xs text-gray">Sealed fresh</p>
              </div>
            </div>
            <div className="pd-trust-item">
              <RefreshCw size={18} />
              <div>
                <p className="fw-bold text-xs">Easy Returns</p>
                <p className="text-xs text-gray">On damaged items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="pd-tabs-wrap">
        <div className="pd-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={activeTab === t}
              className={`pd-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="pd-tab-content">
          {activeTab === 'Description' && (
            <div>
              <p>{product.description}</p>
              <p className="mt-2">
                Every Gopaji pack is made with care at our facility in Shindematha,
                Brahmanwada, Maharashtra — bringing you the crunch you love, sealed
                fresh for every bite.
              </p>
            </div>
          )}

          {activeTab === 'Ingredients' && (
            <div>
              <p>{product.ingredients}</p>
              <p className="text-xs text-gray mt-2">
                Contains: See packet for allergen information. Store in a cool, dry place.
              </p>
            </div>
          )}

          {activeTab === 'Nutrition' && (
            <table className="nutrition-table">
              <tbody>
                <tr>
                  <td>Energy</td>
                  <td>{product.nutrition.energy}</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td>{product.nutrition.protein}</td>
                </tr>
                <tr>
                  <td>Carbohydrates</td>
                  <td>{product.nutrition.carbs}</td>
                </tr>
                <tr>
                  <td>Total Fat</td>
                  <td>{product.nutrition.fat}</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'Product Info' && (
            <table className="nutrition-table">
              <tbody>
                <tr><td>Brand</td><td>GOPAJI</td></tr>
                <tr><td>Category</td><td>{product.category}</td></tr>
                <tr><td>Flavor</td><td>{product.flavor}</td></tr>
                <tr><td>Net Weight</td><td>{product.weight}</td></tr>
                <tr><td>MRP</td><td>{formatINR(product.mrp)}</td></tr>
                <tr><td>Country of Origin</td><td>India</td></tr>
                <tr><td>Manufacturer</td><td>Gopaji Industries, Shindematha, Brahmanwada, Maharashtra</td></tr>
                <tr><td>Vegetarian</td><td>Yes</td></tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ===== Reviews ===== */}
      <div className="pd-reviews">
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Customer <span>Reviews</span>
          </h2>
          <div className="pd-reviews-summary">
            <span className="pd-reviews-score">{product.rating.toFixed(1)}</span>
            <div>
              <Rating value={product.rating} showCount={false} size={14} />
              <p className="text-xs text-gray">{product.reviewCount} reviews</p>
            </div>
          </div>
        </div>

        <div className="pd-review-list">
          {[
            { name: 'Aarav', text: 'Perfect crunch! Loved the flavor balance.', rating: 5 },
            { name: 'Priya', text: 'Great snack for movie nights with family.', rating: 4 },
            { name: 'Rohan', text: 'Fresh and tasty — will order again.', rating: 5 },
          ].map((r, i) => (
            <div className="pd-review" key={i}>
              <div className="pd-review-avatar">{r.name[0]}</div>
              <div className="pd-review-body">
                <div className="flex-between" style={{ alignItems: 'center' }}>
                  <p className="fw-bold">{r.name}</p>
                  <Rating value={r.rating} showCount={false} size={12} />
                </div>
                <p className="text-sm text-gray mt-1">{r.text}</p>
                <p className="text-xs text-gray mt-1" style={{ opacity: 0.7 }}>
                  Demo review — for preview only
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Related ===== */}
      {related.length > 0 && (
        <div className="pd-related">
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            You May Also <span>Like</span>
          </h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}