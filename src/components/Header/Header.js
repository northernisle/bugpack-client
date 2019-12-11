import React from 'react';
import HeaderLink from './HeaderLink';
import HeaderProfile from './HeaderProfile';
import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <HeaderLink text='Home' to='/' />
        <HeaderLink text='Board' to='/board' />
        <HeaderLink text='Issues' to='/issues' />
      </div>
      <div className={styles.profile}>
        <HeaderProfile />
      </div>
    </div>
  );
}

export default Header;