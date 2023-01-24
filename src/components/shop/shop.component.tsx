import './shop.style.scss';

import { useProductsStore } from '@/contexts';
import ProductCard from '../product-card/product-card.component';

const Shop = () => {
  const { products } = useProductsStore();

  return (
    <div className="products-container">
      {products.map(product => {
        const { id } = product;
        return <ProductCard key={id} product={product}></ProductCard>;
      })}
    </div>
  );
};

export default Shop;
