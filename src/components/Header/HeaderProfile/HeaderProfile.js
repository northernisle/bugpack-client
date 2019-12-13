import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './headerprofile.module.scss';

const HeaderProfile = ({ token }) => {
  if (!!token) {
    return <div>Logout</div>
  }

  return (
    <div className={styles.container}>
      <Link to='/login' className={styles.item}>Sign in</Link>
      <Link to='/join' className={styles.item}>Sign up</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return { token: state.authToken };
}

export default connect(mapStateToProps)(HeaderProfile);