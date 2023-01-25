import './checkout-item.style.scss';

import type { CartItem } from '@/contexts';
import { useCartStore } from '@/contexts';

interface CheckoutItemProps {
  cartItem: CartItem;
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { addCartItem, removeCartItem, clearCartItem } = useCartStore();
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeCartItem(cartItem)}>
          &#10094;
        </div>
        <span className="value"> {quantity} </span>
        <div className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price} </span>

      <span className="remove-button" onClick={() => clearCartItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
