import './category.style.scss';

import ProductCard from '@/components/product-card/product-card.component';
import { useCategoriesStore } from '@/contexts';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useCategoriesStore();

  const products = categoriesMap[category ?? ''] ?? [];

  return (
    <div className="category-container">
      {products.map(product => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
};

export default Category;
