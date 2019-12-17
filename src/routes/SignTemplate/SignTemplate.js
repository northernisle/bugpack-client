import React from 'react';
import styles from './sign.module.scss';

const SignTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {children}
      </div>
    </div>
  )
}

export default SignTemplate;