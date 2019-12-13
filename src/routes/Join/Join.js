import React from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import PasswordField from '../../components/PasswordField';
import TextInput from '../../components/Forms/TextInput';
import validators from '../../utils/validators';
import { useComplexState } from '../../utils/hooks';

import styles from './join.module.scss';

const Join = () => {
  const [valid, setValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);

  const formStateObject = { value: '', message: null };
  const state = {
    username: useComplexState(formStateObject),
    email: useComplexState(formStateObject),
    password: useComplexState(formStateObject)
  }

  const validateField = async (field) => {
    let message = null;
    const value = state[field].properties.value;
    switch (field) {
      case 'username':
        message = validators.between(value, field, 3, 25);
        break;
      case 'email':
        message = await validators.validEmail(value);
        break;
      case 'password':
        message = validators.between(value, field, 8, 25);
        break;
      default:
        return;
    }

    setValid(!message);
    state[field].setState({ message });
  }

  const submit = async () => {
    for (const field in state) {
      await validateField(field);
    }

    if (valid) {
      // TODO: Refactor this to be more scalable
      setLoading(true);
      const { data } = await axios.post('http://localhost:3001/users', {
        name: state.username.properties.value,
        email: state.email.properties.value,
        password: state.password.properties.value
      });

      window.localStorage.setItem('authToken', data.token);
      setRegistered(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign up</h1>
        <div className={styles.form}>
          <TextInput
            required
            type='text'
            label='Username'
            variant='filled'
            state={state.username}
            validate={() => validateField('username')}
          />
          <TextInput
            required
            type='email'
            label='Email'
            variant='filled'
            state={state.email}
            validate={() => validateField('email')}
          />
          <PasswordField
            state={state.password}
            validate={() => validateField('password')}
          />
          <p className={styles.signInMessage}>
            Have an account? <Link className={styles.signInLink} to='/login'>Sign in.</Link>
          </p>
          <Button variant='outlined' color='primary' onClick={submit} size='large'>
            {
              !loading &&
              'Sign up'
            }
            {
              loading &&
              <CircularProgress size={25} />
            }
          </Button>
        </div>
      </div>
      {
        registered &&
        <Redirect to='/' />
      }
    </div>
  );
};

export default Join;