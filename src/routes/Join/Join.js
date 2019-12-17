import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuthToken } from '../../redux/actions';
import axios from '../../utils/configs/axiosConfig';
import SignFlow from '../SignFlow';

import styles from './join.module.scss';

const Join = ({ setAuthToken }) => {
  const [registered, setRegistered] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const submit = async ({ username, email, password }) => {
    setErrorMessage(null);

    try {
      const { data } = await axios.post('users', {
        name: username,
        email,
        password
      });

      setAuthToken(data.token);
      setRegistered(true);
    } catch (e) {
      setErrorMessage('Something went terribly wrong. Maybe try again?');
    }

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

export default connect(undefined, { setAuthToken })(Join);