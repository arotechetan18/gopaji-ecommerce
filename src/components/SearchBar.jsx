import { Search, X } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search products…',
  autoFocus = false,
}) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      role="search"
    >
      <Search size={18} className="search-bar-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search products"
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange?.('')}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}