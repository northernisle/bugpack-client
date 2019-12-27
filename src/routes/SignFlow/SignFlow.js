import React, { useRef, useState, useEffect } from 'react';

import TextInput from '../../components/Forms/TextInput';
import PasswordInput from '../../components/Forms/PasswordInput';
import validators from '../../utils/validators';
import LoadingButton from '../../components/LoadingButton';

import styles from './signInFlow.module.scss';

const SignFlow = ({ header, messageSlot, hideUsername, submitCallback, errorMessage }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage]);

  const formRefs = {
    username: useRef(),
    email: useRef(),
    password: useRef()
  };

  const submit = async (e) => {
    e && e.preventDefault();
    setLoading(true);

    const refArray = Object.values(formRefs);

    if (hideUsername) {
      refArray.shift();
    }

    const validationArray = refArray.map(ref => ref.current.validate());
    const formValid = !(await Promise.all(validationArray)).includes(false);

    if (formValid && submitCallback) {
      const valueArray = refArray.map(ref => ref.current.value);

      if (hideUsername) {
        const [email, password] = valueArray;
        submitCallback({ email, password });
      } else {
        const [username, email, password] = valueArray;
        submitCallback({ username, email, password });
      }
    }
  }

  return (
    <>
      <h1>{header}</h1>
      <form className={styles.form} noValidate>
        {
          !hideUsername &&
          <TextInput
            required
            id='username'
            type='text'
            label='Username'
            variant='filled'
            className={styles.input}
            ref={formRefs.username}
            validation={(value, field) => validators.between(value, field, 3, 25)}
          />
        }
        <TextInput
          required
          id='email'
          type='email'
          label='Email'
          variant='filled'
          className={styles.input}
          ref={formRefs.email}
          validation={(value) => validators.validEmail(value, !hideUsername)}
        />
        <PasswordInput
          required
          id='password'
          label='Password'
          className={styles.input}
          ref={formRefs.password}
          validation={(value, field) => validators.between(value, field, 8, 25)}
        />
        {messageSlot}
        <div className={styles.button}>
          <LoadingButton text={header} loading={loading} onClick={e => submit(e)} />
        </div>
        {
          errorMessage &&
          <p className={styles.error}>{errorMessage}</p>
        }
      </form>
    </>
  );
};

export default SignFlow;