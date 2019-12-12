import React from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordField = ({ value, onChange, required = true }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      id='password'
      required={required}
      label='Password'
      variant='filled'
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={e => onChange(e)}
      InputProps={{
        endAdornment:
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              edge='end'
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={e => e.preventDefault()}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
      }}
    />
  );
}

export default PasswordField;