import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PasswordField from '../../components/PasswordField';
import TextInput from '../../components/Forms/TextInput';
import validators from '../../utils/validators';
import { useComplexState } from '../../utils/hooks';
import { setAuthToken } from '../../redux/actions';
import axios from '../../utils/configs/axiosConfig';

import styles from './join.module.scss';

const Join = props => {
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

    state[field].setState({ message });
    return !message;
  }

  const submit = async () => {
    let valid = 0;
    for (const field in state) {
      valid += await validateField(field);
    }

    if (valid === 3) {
      setLoading(true);

      const { data } = await axios.post('users', {
        name: state.username.properties.value,
        email: state.email.properties.value,
        password: state.password.properties.value
      });

      props.setAuthToken(data.token);
      setRegistered(true);
    }
  }

  if (registered) {
    return <Redirect to='/' />
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
            enterPressed={submit}
          />
          <TextInput
            required
            type='email'
            label='Email'
            variant='filled'
            state={state.email}
            validate={() => validateField('email')}
            enterPressed={submit}
          />
          <PasswordField
            required
            state={state.password}
            validate={() => validateField('password')}
            enterPressed={submit}
          />
          <p className={styles.signInMessage}>
            Have an account? <Link className={styles.signInLink} to='/login'>Sign in.</Link>
          </p>
          <Button variant='outlined' color='primary' onClick={submit} size='large'>
            { loading ? <CircularProgress size={25} /> : 'Sign up' }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(undefined, { setAuthToken })(Join);