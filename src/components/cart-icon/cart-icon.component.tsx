import './cart-icon.style.scss';

const CardIcon = () => {
  return (
    <div className="cart-icon-container">
      <img className="shopping-icon" src="/src/assets/shopping-bag.svg" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CardIcon;
