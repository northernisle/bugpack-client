import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({ state, validate, enterPressed, ...props }) => {
  const [fieldPrestine, setFieldPrestine] = useState(true);

  useEffect(() => {
    if (!fieldPrestine) {
      validate();
    }

    // eslint-disable-next-line
  }, [state.properties.value, fieldPrestine]);

  useEffect(() => {
    if (state.properties.message && fieldPrestine) {
      setFieldPrestine(false);
    }
  }, [state.properties.message, fieldPrestine]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && enterPressed) {
      enterPressed();
    }
  }

  const handleBlur = () => {
    validate();
    setFieldPrestine(false);
  }

  return (
    <TextField
      {...props}
      helperText={state.properties.message}
      value={state.properties.value}
      error={!!state.properties.message}
      onChange={e => state.setState({ value: e.target.value.trim() })}
      onBlur={handleBlur}
      onKeyPress={e => handleKeyPress(e)}
    />
  );
}

export default TextInput;