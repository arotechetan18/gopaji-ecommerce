import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import ProductPacket from './ProductPacket';
import Rating from './Rating';
import { formatINR, calcDiscount } from '../utils/formatCurrency';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  const discount = calcDiscount(product.mrp, product.price);
  const outOfStock = product.stock <= 0;

  return (
    <div className="product-card card fade-up">
      {/* Badges */}
      <div className="product-badges">
        {discount > 0 && <span className="badge badge-red">-{discount}%</span>}
        {product.isNew && <span className="badge badge-new">NEW</span>}
        {outOfStock && <span className="badge badge-orange">OUT OF STOCK</span>}
      </div>

      {/* Wishlist */}
      <button
        className={`product-wishlist ${isWishlisted ? 'active' : ''}`}
        onClick={() => onToggleWishlist?.(product)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        type="button"
      >
        <Heart
          size={18}
          fill={isWishlisted ? '#C8102E' : 'transparent'}
          color={isWishlisted ? '#C8102E' : '#2B2B2B'}
        />
      </button>

      {/* Packet visual */}
      <Link to={`/product/${product.id}`} className="product-packet-wrap">
        <ProductPacket
          name={product.name}
          flavor={product.flavor}
          weight={product.weight}
          mrp={product.mrp}
          colors={product.packetColors}
          size="md"
        />
      </Link>

      {/* Info */}
      <div className="product-info">
        <span className="product-category text-xs text-red fw-bold">
          {product.flavor}
        </span>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <Rating value={product.rating} count={product.reviewCount} />

        <div className="product-price-row">
          <span className="product-price">{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <span className="product-mrp">{formatINR(product.mrp)}</span>
          )}
        </div>

        <div className="product-actions">
          <button
            className="btn btn-primary product-cart-btn"
            disabled={outOfStock}
            onClick={() => onAddToCart?.(product)}
            type="button"
          >
            <ShoppingCart size={16} />
            {outOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="product-view-btn"
            aria-label="View product"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}