import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="category-card card fade-up"
      style={{ '--cat-color': category.color }}
    >
      <div className="category-icon" aria-hidden="true">
        {category.icon}
      </div>
      <div className="category-body">
        <h4 className="category-name">{category.name}</h4>
        <p className="category-count text-xs text-gray">
          {category.count} products
        </p>
      </div>
    </Link>
  );
}