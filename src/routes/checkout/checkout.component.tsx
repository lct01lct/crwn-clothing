import './checkout.style.scss';

import CheckoutItem from './checkout-item/checkout-item.component';
import { useCartStore } from '@/contexts';

const Checkout = () => {
  const { cartItems, total } = useCartStore();

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map(item => (
        <CheckoutItem key={item.id} cartItem={item}></CheckoutItem>
      ))}

      <span className="total"> Total: ${total}</span>
    </div>
  );
};

export default Checkout;
