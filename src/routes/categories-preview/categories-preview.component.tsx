import { useCategoriesStore } from '@/contexts';
import CategoryPreview from '@/components//category-preview/category-preview.component';
import { Fragment } from 'react';

const CategoriesPreview = () => {
  const { categoriesMap } = useCategoriesStore();

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];

        return <CategoryPreview title={title} products={products} key={title}></CategoryPreview>;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
