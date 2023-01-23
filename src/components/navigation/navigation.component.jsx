import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CrwnLogoSrc from '@/assets/crown.svg';
import './navigation.style.scss';
import { useUserStore } from '@/contexts/user.context';
import { signOutUser } from '@/utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useUserStore();
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
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Navigation;
