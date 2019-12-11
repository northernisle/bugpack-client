import React from 'react';
import { Link } from 'react-router-dom';
import styles from './headerprofile.module.scss';

const HeaderProfile = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    setAuthenticated(!!token);

  }, []);

  if (authenticated) {
    return <div>Logout</div>
  }

  return (
    <div className={styles.container}>
      <Link to='/login' className={styles.item}>Sign in</Link>
      <Link to='/join' className={styles.item}>Sign up</Link>
    </div>
  );
};

export default HeaderProfile;