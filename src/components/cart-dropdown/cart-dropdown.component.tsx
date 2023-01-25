import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from './cart-item/cart-item.component';
import { useCartStore } from '@/contexts';
import { useNavigate } from 'react-router-dom';

export default () => {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className={`cart-items`}>
        {cartItems.map(item => {
          return <CartItem key={item.id} cartItem={item}></CartItem>;
        })}
      </div>
      <Button onClick={goToCheckoutHandler}>
        <span style={{ fontSize: 12 }}>GO TO CHECKOUT</span>
      </Button>
    </div>
  );
};
