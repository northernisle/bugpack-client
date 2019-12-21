import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const LoadingButton = ({ text, onClick, loading }) => {
  return (
    <Button
      variant='outlined'
      color='primary'
      size='large'
      type='submit'
      style={{ width: '100%' }}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={25} /> : text}
    </Button>
  );
}

export default LoadingButton;