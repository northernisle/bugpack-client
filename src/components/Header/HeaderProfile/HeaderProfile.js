import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeAuthToken } from '../../../redux/actions';
import styles from './headerprofile.module.scss';

const HeaderProfile = ({ token, removeAuthToken }) => {
  const logout = () => {
    removeAuthToken();
  }

  return (
    <div className={styles.container}>
      {
        !!token ?
          <div className={styles.item} onClick={logout}>Logout</div>
          :
          <>
            <Link to='/login' className={styles.item}>Sign in</Link>
            <Link to='/join' className={styles.item}>Sign up</Link>
          </>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return { token: state.authToken };
}

export default connect(mapStateToProps, { removeAuthToken })(HeaderProfile);