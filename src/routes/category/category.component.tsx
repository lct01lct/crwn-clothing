import './category.style.scss';

import ProductCard from '@/components/product-card/product-card.component';
import { useCategoriesStore } from '@/contexts';
import { Product } from '@/contexts/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useCategoriesStore();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const categories = categoriesMap[category as unknown as string];
    categories && setProducts(categories);
  }, [category, categoriesMap]);
  return (
    <div className="category-container">
      {products.map(product => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
};

export default Category;
