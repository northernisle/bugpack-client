import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeAuthUser } from '../../../redux/actions';

import styles from './headerprofile.module.scss';

const HeaderProfile = ({ user, removeAuthUser }) => {
  return (
    <div className={styles.container}>
      { 
        !!user ?
          <div className={styles.item} onClick={removeAuthUser}>Logout</div>
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
  return { user: state?.authUser?.user };
}

export default connect(mapStateToProps, { removeAuthUser })(HeaderProfile);