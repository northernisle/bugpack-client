import React from 'react';

import PasswordField from '../../components/PasswordField';
import TextInput from '../../components/Forms/TextInput';
import LoadingButton from '../../components/LoadingButton';
import validators from '../../utils/validators';
import { useComplexState } from '../../utils/hooks';

import styles from './signInFlow.module.scss';

const SignFlow = ({ header, messageSlot, hideUsername, submitCallback, errorMessage }) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!errorMessage) {
      return;
    }

    setLoading(!errorMessage);
  }, [errorMessage, loading]);

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
        message = hideUsername ? null : validators.between(value, field, 3, 25);
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

    if (valid === Object.keys(state).length) {
      submitCallback({
        username: state.username.properties.value,
        email: state.email.properties.value,
        password: state.password.properties.value
      });
      setLoading(true);
    }
  }

  return (
    <>
      <h1>{header}</h1>
      <div className={styles.form}>
        {
          !hideUsername &&
          <TextInput
            className={styles.input}
            required
            type='text'
            label='Username'
            variant='filled'
            state={state.username}
            validate={() => validateField('username')}
            enterPressed={submit}
          />
        }
        <TextInput
          className={styles.input}
          required
          type='email'
          label='Email'
          variant='filled'
          state={state.email}
          validate={() => validateField('email')}
          enterPressed={submit}
        />
        <PasswordField
          className={styles.input}
          required
          state={state.password}
          validate={() => validateField('password')}
          enterPressed={submit}
        />
        {messageSlot}
        <div className={styles.button}>
          <LoadingButton text={'Sign up'} loading={loading} onClick={submit} />
        </div>
        {
          errorMessage &&
          <p className={styles.error}>{errorMessage}</p>
        }
      </div>
    </>
  );
};

export default SignFlow;