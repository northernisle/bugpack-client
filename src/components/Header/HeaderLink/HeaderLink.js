import React from 'react';
import { Link } from 'react-router-dom';
import styles from './headerlink.module.scss';

const HeaderLink = ({ text, to, exact = false }) => {
  return (
    <Link to={to} className={styles.text}>{text}</Link>
  )
};

export default HeaderLink;