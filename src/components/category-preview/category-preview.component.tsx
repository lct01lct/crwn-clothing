import { Category, Product } from '@/contexts/types';
import './category-preview.style.scss';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

interface CategoryPreviewProps {
  title: Category['title'];
  products: Product[];
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2 className="category-title">
        <Link to={title}>{title.toLowerCase()}</Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map(product => {
            return <ProductCard key={product.id} product={product}></ProductCard>;
          })}
      </div>
    </div>
  );
};

export default CategoryPreview;
