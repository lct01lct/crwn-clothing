import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from './cart-item/cart-item.component';
import { useCartStore } from '@/contexts';

export default () => {
  const { cartItems } = useCartStore();

  return (
    <div className="cart-dropdown-container">
      <div className={`cart-items`}>
        {cartItems.map(item => {
          return <CartItem key={item.id} cartItem={item}></CartItem>;
        })}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
