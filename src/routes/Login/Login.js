import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormControlLabel, Checkbox } from '@material-ui/core';

import { loginUser } from '../../redux/actions';
import SignFlow from '../SignFlow';

import styles from './login.module.scss';

const Login = ({ loginUser, authUser }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    if (!authUser.pending) {
      if (authUser.error) {
        setErrorMessage('Couldn\'t find an account matching those credentials.');
      } else if (authUser.token) {
        setLoggedIn(true);
      }
    }
  }, [authUser]);

  const submit = async ({ email, password }) => {
    setErrorMessage(null);

    loginUser({ email, password, rememberMe });
  }

  if (loggedIn) {
    return <Redirect to='/' />
  }

  return (
    <SignFlow
      hideUsername
      header={'Sign in'}
      messageSlot={
        <div className={styles.extra}>
          <FormControlLabel
            control={
              <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            }
            label="Remember me"
          />
          <p>
            Need an account? <Link className={styles.signInLink} to='/join'>Sign up</Link>.
          </p>
        </div>
      }
      errorMessage={errorMessage}
      submitCallback={data => submit(data)}
    />
  );
};

export default connect(({ authUser }) => ({ authUser }), { loginUser })(Login);