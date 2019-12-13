import React from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TextInput from '../../components/Forms/TextInput';

const PasswordField = props => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextInput
      {...props}
      id='password'
      label='Password'
      variant='filled'
      type={showPassword ? 'text' : 'password'}
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