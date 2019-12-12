import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PasswordField from '../../components/PasswordField';
import styles from './join.module.scss';

const Join = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign up</h1>
        <div className={styles.form}>
          <TextField
            required
            type='text'
            label='Username'
            variant='filled'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            required
            type='email'
            label='Email'
            variant='filled'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <PasswordField value={password} onChange={e => setPassword(e.target.value)} />
          <p className={styles.signInMessage}>
            Have an account? <Link className={styles.signInLink} to='/login'>Sign in.</Link>
          </p>
          <Button variant='outlined' color='primary'>Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default Join;