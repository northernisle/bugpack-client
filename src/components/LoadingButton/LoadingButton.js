import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const LoadingButton = ({ text, onClick, loading }) => {
  return (
    <Button style={{ width: '100%' }} variant='outlined' color='primary' onClick={onClick} size='large'>
      {loading ? <CircularProgress size={25} /> : text}
    </Button>
  );
}

export default LoadingButton;