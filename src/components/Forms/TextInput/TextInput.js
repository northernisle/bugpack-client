import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({ state, validate, ...props }) => {
  return (
    <TextField
      {...props}
      helperText={state.properties.message}
      value={state.properties.value}
      error={!!state.properties.message}
      onChange={e => state.setState({ value: e.target.value.trim() })}
      onBlur={validate}
      onFocus={() => state.setState({ message: null })}
    />
  );
}

export default TextInput;