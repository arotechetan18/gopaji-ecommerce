import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}) {
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  return (
    <div className={`qty-selector qty-${size}`}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'lg' ? 16 : 14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'lg' ? 16 : 14} />
      </button>
    </div>
  );
}