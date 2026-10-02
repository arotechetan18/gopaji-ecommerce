import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/formatCurrency';
import { DELIVERY } from '../utils/constants';
import ProductPacket from '../components/ProductPacket';

export default function Cart() {
  const {
    items, subtotal, discount, delivery, total, count,
    increment, decrement, removeItem, clear,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const remainingForFree = Math.max(DELIVERY.FREE_ABOVE - subtotal, 0);
  const progressPct = Math.min(
    (subtotal / DELIVERY.FREE_ABOVE) * 100,
    100
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <ShoppingCart size={44} />
          </div>
          <h2>Your cart is empty</h2>
          <p className="text-gray">
            Looks like you haven't added any Gopaji crunch yet.
          </p>
          <Link to="/shop" className="btn btn-primary mt-3">
            START SHOPPING <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">Your Cart</span>
        <h1 className="page-title">
          Shopping Cart <span className="text-gray">({count} items)</span>
        </h1>
      </div>

      {/* Free delivery progress */}
      <div className="free-ship-bar">
        <div className="free-ship-left">
          <Truck size={18} />
          {remainingForFree > 0 ? (
            <span>
              Add <strong>{formatINR(remainingForFree)}</strong> more for{' '}
              <strong>FREE delivery</strong>
            </span>
          ) : (
            <span className="text-success fw-bold">
              🎉 You've unlocked FREE delivery!
            </span>
          )}
        </div>
        <div className="free-ship-track">
          <div className="free-ship-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          <div className="cart-items-head flex-between">
            <h3>Items</h3>
            <button
              className="btn-text-danger"
              onClick={clear}
              type="button"
            >
              <Trash2 size={14} /> Clear Cart
            </button>
          </div>

          {items.map((it) => (
            <div className="cart-item" key={it.id}>
              <Link to={`/product/${it.id}`} className="cart-item-img">
                <ProductPacket
                  name={it.name}
                  flavor={it.flavor}
                  weight={it.weight}
                  mrp={it.mrp}
                  colors={it.packetColors}
                  size="sm"
                />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${it.id}`} className="cart-item-name">
                  {it.name}
                </Link>
                <p className="text-xs text-gray">{it.flavor} • {it.weight}</p>

                <div className="cart-item-price">
                  <span className="fw-black text-red">{formatINR(it.price)}</span>
                  {it.mrp > it.price && (
                    <span className="text-xs text-gray" style={{ textDecoration: 'line-through' }}>
                      {formatINR(it.mrp)}
                    </span>
                  )}
                </div>

                <div className="cart-item-actions">
                  <div className="qty-selector">
                    <button
                      onClick={() => decrement(it.id)}
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{it.qty}</span>
                    <button
                      onClick={() => increment(it.id)}
                      aria-label="Increase quantity"
                      type="button"
                      disabled={it.qty >= it.stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    className="btn-text-danger"
                    onClick={() => removeItem(it.id)}
                    type="button"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                {formatINR(it.price * it.qty)}
              </div>
            </div>
          ))}

          <Link to="/shop" className="btn btn-outline mt-3">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="cart-summary card">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({count} items)</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row text-success">
              <span className="flex" style={{ alignItems: 'center', gap: '0.35rem' }}>
                <Tag size={14} /> You Save
              </span>
              <span>− {formatINR(discount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery</span>
            <span>
              {delivery === 0 ? (
                <span className="text-success fw-bold">FREE</span>
              ) : (
                formatINR(delivery)
              )}
            </span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>

          <button
            className="btn btn-primary summary-cta"
            onClick={handleCheckout}
            type="button"
          >
            PROCEED TO CHECKOUT <ArrowRight size={16} />
          </button>

          {!isAuthenticated && (
            <p className="text-xs text-gray text-center mt-2">
              You'll be asked to login before checkout.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}