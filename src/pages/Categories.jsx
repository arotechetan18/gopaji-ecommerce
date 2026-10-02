import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  // Attach product counts dynamically
  const withCounts = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.id).length,
  }));

  return (
    <div className="container section">
      <div className="page-head text-center">
        <span className="eyebrow">Categories</span>
        <h1 className="page-title">
          Shop by <span className="text-red">Category</span>
        </h1>
        <p className="text-gray" style={{ marginTop: '0.5rem', maxWidth: 560, margin: '0.5rem auto 0' }}>
          From classic salted to party combos — find your favorite Gopaji crunch.
        </p>
      </div>

      <div className="category-grid">
        {withCounts.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>

      <div className="text-center mt-3">
        <Link to="/shop" className="btn btn-primary">
          Browse All Products <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}