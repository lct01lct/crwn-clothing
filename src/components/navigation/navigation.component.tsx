import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CrwnLogoSrc from '@/assets/crown.svg';
import CardIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './navigation.style.scss';
import { useUserStore } from '@/contexts/user.context';
import { signOutUser } from '@/utils/firebase/firebase.utils';
import { useCartStore } from '@/contexts';

const Navigation = () => {
  const { currentUser } = useUserStore();
  const { visible } = useCartStore();

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <div className="logo">
          <Link className="logo-container" to="/">
            <img className="logo" src={CrwnLogoSrc}></img>
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CardIcon></CardIcon>
          {visible && <CartDropdown></CartDropdown>}
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Navigation;
