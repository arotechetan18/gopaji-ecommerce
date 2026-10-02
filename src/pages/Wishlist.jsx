import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatCurrency';
import ProductPacket from '../components/ProductPacket';
import Rating from '../components/Rating';

export default function Wishlist() {
  const { items, remove, clear } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Heart size={44} />
          </div>
          <h2>Your wishlist is empty</h2>
          <p className="text-gray">
            Save your favorite Gopaji snacks here for later.
          </p>
          <Link to="/shop" className="btn btn-primary mt-3">
            BROWSE PRODUCTS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="page-head flex-between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="eyebrow">Wishlist</span>
          <h1 className="page-title">
            Saved Items <span className="text-gray">({items.length})</span>
          </h1>
        </div>
        <button className="btn-text-danger" onClick={clear} type="button">
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div className="wishlist-grid">
        {items.map((it) => (
          <div className="wishlist-card card" key={it.id}>
            <button
              className="wishlist-remove"
              onClick={() => remove(it.id)}
              aria-label="Remove from wishlist"
              type="button"
            >
              <Trash2 size={16} />
            </button>

            <Link to={`/product/${it.id}`} className="wishlist-packet">
              <ProductPacket
                name={it.name}
                flavor={it.flavor}
                weight={it.weight}
                mrp={it.mrp}
                colors={it.packetColors}
                size="sm"
              />
            </Link>

            <div className="wishlist-info">
              <Link to={`/product/${it.id}`} className="product-name">
                {it.name}
              </Link>
              <p className="text-xs text-gray">{it.flavor} • {it.weight}</p>
              {it.rating && <Rating value={it.rating} showCount={false} />}

              <div className="wishlist-price">
                <span className="fw-black text-red">{formatINR(it.price)}</span>
                {it.mrp > it.price && (
                  <span className="text-xs text-gray" style={{ textDecoration: 'line-through' }}>
                    {formatINR(it.mrp)}
                  </span>
                )}
              </div>

              <button
                className="btn btn-primary wishlist-cta"
                onClick={() => {
                  addItem(it, 1);
                  remove(it.id);
                }}
                type="button"
              >
                <ShoppingCart size={16} /> MOVE TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
