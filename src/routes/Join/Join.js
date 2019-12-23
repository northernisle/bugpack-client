import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/actions';
import SignFlow from '../SignFlow';

import styles from './join.module.scss';

const Join = ({ registerUser, authUser }) => {
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    if (!authUser.pending) {
      if (authUser.error) {
        setErrorMessage('Something went terribly wrong. Maybe try again?');
      } else if (authUser.token) {
        setRegistered(true);
      }
    }
  }, [authUser]);

  const submit = async ({ username, email, password }) => {
    setErrorMessage(null);
    registerUser({ username, email, password });
  }

  if (registered) {
    return <Redirect to='/' />
  }

  return (
    <SignFlow
      header={'Sign up'}
      messageSlot={
        <p className={styles.signInMessage}>
          Have an account? <Link className={styles.signInLink} to='/login'>Sign in</Link>.
        </p>
      }
      errorMessage={errorMessage}
      submitCallback={data => submit(data)}
    />
  );
};

export default connect(({ authUser }) => ({ authUser }), { registerUser })(Join);