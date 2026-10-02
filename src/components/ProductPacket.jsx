import { BRAND } from '../utils/constants';

/**
 * ProductPacket — CSS-based original Gopaji chips packet mockup.
 * Different flavors साठी different colors वापरतो.
 * Actual product images नसतानाही professional visual मिळतो.
 */
export default function ProductPacket({
  name = 'Gopaji Chips',
  flavor = 'Classic Salted',
  weight = '52g',
  mrp = 25,
  colors = { from: '#FFC72C', to: '#E0A800', accent: '#C8102E' },
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) {
  const sizes = {
    sm: { w: 140, h: 200, title: '1rem', brand: '0.95rem' },
    md: { w: 200, h: 290, title: '1.35rem', brand: '1.25rem' },
    lg: { w: 280, h: 400, title: '1.75rem', brand: '1.7rem' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`gopaji-packet ${className}`}
      style={{
        width: s.w,
        height: s.h,
        background: `linear-gradient(160deg, ${colors.from} 0%, ${colors.to} 100%)`,
        '--accent': colors.accent,
      }}
      role="img"
      aria-label={`${name} packet, ${flavor}, ${weight}`}
    >
      {/* Top zigzag edge */}
      <div className="packet-zigzag-top" aria-hidden="true" />

      {/* Shine strip */}
      <div className="packet-shine" aria-hidden="true" />

      {/* Brand */}
      <div className="packet-brand" style={{ fontSize: s.brand }}>
        {BRAND.name}
      </div>

      {/* Flavor ribbon */}
      <div className="packet-flavor-ribbon" style={{ fontSize: s.title }}>
        {flavor}
      </div>

      {/* Chips illustration (CSS) */}
      <div className="packet-chips" aria-hidden="true">
        <span className="chip chip-1" />
        <span className="chip chip-2" />
        <span className="chip chip-3" />
        <span className="chip chip-4" />
      </div>

      {/* Tagline */}
      <div className="packet-tagline">EXTRA CRUNCH • EXTRA FLAVOR</div>

      {/* Bottom info row */}
      <div className="packet-info">
        <span className="packet-weight">Net Wt. {weight}</span>
        <span className="packet-mrp">MRP ₹{mrp}</span>
      </div>

      {/* Veg indicator */}
      <div className="packet-veg" title="Vegetarian" aria-label="Vegetarian">
        <span />
      </div>

      {/* Bottom zigzag edge */}
      <div className="packet-zigzag-bottom" aria-hidden="true" />
    </div>
  );
}