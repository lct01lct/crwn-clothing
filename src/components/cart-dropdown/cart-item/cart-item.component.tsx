import type { CartItem } from '@/contexts';
import './cart-item.styles.scss';

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name"> {name} </span>
        <span className="price">
          {quantity} * ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
