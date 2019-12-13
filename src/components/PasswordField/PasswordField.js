import React from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordField = ({ state, validate, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      {...props}
      id='password'
      label='Password'
      variant='filled'
      type={showPassword ? 'text' : 'password'}
      helperText={state.properties.message}
      value={state.properties.value}
      error={!!state.properties.message}
      onChange={e => state.setState({ value: e.target.value.trim() })}
      onBlur={validate}
      onFocus={() => state.setState({ message: null })}
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