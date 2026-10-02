import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Star, Package, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/formatCurrency';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
  { id: 'newest', label: 'Newest' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-25', label: 'Under ₹25', min: 0, max: 25 },
  { id: '25-50', label: '₹25 – ₹50', min: 25, max: 50 },
  { id: '50-100', label: '₹50 – ₹100', min: 50, max: 100 },
  { id: 'above-100', label: 'Above ₹100', min: 100, max: Infinity },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [search, setSearch] = useState(params.get('search') || '');
  const [selectedCats, setSelectedCats] = useState(() => {
    const c = params.get('category');
    return c ? [c] : [];
  });
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync search from URL
  useEffect(() => {
    const s = params.get('search');
    if (s !== null) setSearch(s);
  }, [params]);

  // Update URL when search/category changes (debounced-ish — just on submit)
  const commitSearch = (val) => {
    const next = new URLSearchParams(params);
    if (val) next.set('search', val);
    else next.delete('search');
    setParams(next, { replace: true });
  };

  const toggleCategory = (id) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCats([]);
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.flavor.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCats.length > 0) {
      list = list.filter((p) => selectedCats.includes(p.category));
    }

    // Price
    const range = PRICE_RANGES.find((r) => r.id === priceRange);
    if (range && range.id !== 'all') {
      list = list.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Rating
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Stock
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [search, selectedCats, priceRange, minRating, inStockOnly, sortBy]);

  const activeFilterCount =
    selectedCats.length +
    (priceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // ===== Filters Panel (used in both sidebar & drawer) =====
  const FiltersPanel = () => (
    <div className="filters-inner">
      {/* Category */}
      <div className="filter-group">
        <h4 className="filter-title">Category</h4>
        <ul className="filter-list">
          {categories.map((c) => (
            <li key={c.id}>
              <label className="filter-check">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                <span>{c.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h4 className="filter-title">Price</h4>
        <ul className="filter-list">
          {PRICE_RANGES.map((r) => (
            <li key={r.id}>
              <label className="filter-check">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === r.id}
                  onChange={() => setPriceRange(r.id)}
                />
                <span>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <h4 className="filter-title">Rating</h4>
        <div className="filter-rating-row">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              type="button"
              className={`filter-rating-btn ${minRating === r ? 'active' : ''}`}
              onClick={() => setMinRating(r)}
            >
              {r === 0 ? (
                'All'
              ) : (
                <>
                  {r}+ <Star size={12} fill="#FFC72C" color="#FFC72C" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div className="filter-group">
        <h4 className="filter-title">Availability</h4>
        <label className="filter-check">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>In stock only</span>
        </label>
      </div>

      <button
        className="btn btn-outline filter-clear"
        onClick={clearFilters}
        type="button"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="container section">
      {/* Page head */}
      <div className="page-head">
        <span className="eyebrow">Shop</span>
        <h1 className="page-title">
          All <span className="text-red">Products</span>
        </h1>
        <p className="text-gray" style={{ marginTop: '0.5rem' }}>
          Explore the full Gopaji range — {products.length} crunchy snacks.
        </p>
      </div>

      {/* Search + top bar */}
      <div className="shop-topbar">
        <div className="shop-search">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={commitSearch}
            placeholder="Search chips, flavors, combos…"
          />
        </div>

        <div className="shop-topbar-actions">
          <button
            className="btn btn-outline shop-filter-btn"
            onClick={() => setDrawerOpen(true)}
            type="button"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="filter-count-badge">{activeFilterCount}</span>
            )}
          </button>

          <select
            className="form-select shop-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar (desktop) */}
        <aside className="shop-sidebar">
          <div className="card shop-sidebar-card">
            <h3 className="shop-sidebar-title">
              <SlidersHorizontal size={16} /> Filters
            </h3>
            <FiltersPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="shop-products">
          <div className="shop-products-head">
            <p className="text-sm">
              <strong>{filtered.length}</strong> Products
              {selectedCats.length > 0 && (
                <>
                  {' '}in{' '}
                  <span className="text-red fw-bold">
                    {selectedCats
                      .map((id) => categories.find((c) => c.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </>
              )}
            </p>
            {activeFilterCount > 0 && (
              <button
                className="btn-text-danger"
                onClick={clearFilters}
                type="button"
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <Package size={44} />
              </div>
              <h2>No products found</h2>
              <p className="text-gray">
                Try adjusting your filters or search for something else.
              </p>
              <button
                className="btn btn-primary mt-3"
                onClick={clearFilters}
                type="button"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(prod) => addItem(prod, 1)}
                  onToggleWishlist={(prod) => toggle(prod)}
                  isWishlisted={isWishlisted(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={`filter-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="filter-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        <div className="filter-drawer-panel">
          <div className="filter-drawer-header">
            <h3>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</h3>
            <button
              className="nav-icon-btn"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              type="button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="filter-drawer-body">
            <FiltersPanel />
          </div>
          <div className="filter-drawer-footer">
            <button
              className="btn btn-primary"
              onClick={() => setDrawerOpen(false)}
              style={{ width: '100%' }}
              type="button"
            >
              Show {filtered.length} Products <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}