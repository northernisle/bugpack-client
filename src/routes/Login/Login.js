import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuthToken } from '../../redux/actions';
import axios from '../../utils/configs/axiosConfig';
import SignFlow from '../SignFlow';

import styles from './login.module.scss';

const Login = ({ setAuthToken }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const submit = async ({ email, password }) => {
    setErrorMessage(null);

    try {
      const { data } = await axios.post('users/login', {
        email,
        password
      });

      setAuthToken(data.token);
      setLoggedIn(true);
    } catch (e) {
      setErrorMessage('Couldn\'t find an account matching those credentials.');
    }
  }

  if (loggedIn) {
    return <Redirect to='/' />
  }

  return (
    <SignFlow
      hideUsername
      header={'Sign in'}
      messageSlot={
        <p className={styles.signInMessage}>
          Need an account? <Link className={styles.signInLink} to='/join'>Sign up</Link>.
        </p>
      }
      errorMessage={errorMessage}
      submitCallback={data => submit(data)}
    />
  );
};

export default connect(undefined, { setAuthToken })(Login);