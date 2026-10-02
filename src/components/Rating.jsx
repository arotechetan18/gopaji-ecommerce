import { Star } from 'lucide-react';

export default function Rating({ value = 0, count = 0, size = 14, showCount = true }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className="rating flex" style={{ alignItems: 'center', gap: '0.35rem' }}>
      <div className="rating-stars flex" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= full || (i === full + 1 && half);
          return (
            <Star
              key={i}
              size={size}
              strokeWidth={2}
              fill={filled ? '#FFC72C' : 'transparent'}
              color={filled ? '#FFC72C' : '#C9C9C9'}
            />
          );
        })}
      </div>
      <span className="text-xs text-gray fw-bold">{value.toFixed(1)}</span>
      {showCount && count > 0 && (
        <span className="text-xs text-gray">({count})</span>
      )}
    </div>
  );
}