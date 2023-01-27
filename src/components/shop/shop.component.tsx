import './shop.style.scss';

import { Fragment } from 'react';
import { useCategoriesStore } from '@/contexts';
import ProductCard from '../product-card/product-card.component';

const Shop = () => {
  const { categoriesMap } = useCategoriesStore();

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(title => {
        return (
          <Fragment key={title}>
            <h2>{title}</h2>
            <div className="products-container">
              {categoriesMap[title].map(product => {
                return <ProductCard key={product.id} product={product}></ProductCard>;
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Shop;
