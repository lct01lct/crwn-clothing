import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CrwnLogoSrc from '@/assets/crown.svg';
import './navigation.style.scss';

const Navigation = () => {
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
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Navigation;
