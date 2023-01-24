import './cart-icon.style.scss';
import { useCartStore } from '@/contexts';

const CardIcon = () => {
  const { visible, setVisible } = useCartStore();
  const onCartIconClick = () => {
    setVisible(!visible);
  };

  return (
    <div className="cart-icon-container" onClick={onCartIconClick}>
      <img className="shopping-icon" src="/src/assets/shopping-bag.svg" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CardIcon;
