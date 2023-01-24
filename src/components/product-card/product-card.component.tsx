import './product-card.style.scss';
import Button from '../button/button.component';
import { ProductItem, useCartStore } from '@/contexts';

const ProductCard = ({ product }: { product: ProductItem }) => {
  const { name, imageUrl, price } = product;
  const { addCartItem } = useCartStore();

  const onAddToCartBtnClick = () => {
    addCartItem(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price"> ${price} </span>
      </div>
      <Button buttonType="inverted" onClick={onAddToCartBtnClick}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
