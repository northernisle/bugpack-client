import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TextInput from '../TextInput';

const PasswordInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  const [showPassword, setShowPassword] = React.useState(false);

  useImperativeHandle(ref, () => ({
    validate: () => inputRef.current.validate(),
    value: inputRef.current.value
  }));

  return (
    <TextInput
      {...props}
      id='password'
      label='Password'
      variant='filled'
      ref={inputRef}
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
});

export default PasswordInput;