import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextField } from '@material-ui/core';

const TextInput = forwardRef(({ id, initialValue = '', validation, ...props }, ref) => {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState(null);
  const [prestine, setPrestine] = useState(true);

  useImperativeHandle(ref, () => ({
    async validate() {
      return !!message ? !message : await validate(value, id);
    },
    value
  }));

  const handleChange = (e) => {
    const currentValue = e.target.value.trim();
    setValue(currentValue);

    if (prestine) {
      return;
    }

    validate(currentValue, id);
  }

  const handleBlur = () => {
    setPrestine(false);

    if (!!message) {
      return;
    }

    validate(value, id);
  }

  const validate = (value, id) => new Promise((resolve, _reject) => {
    if (prestine) setPrestine(false);

    const validationResult = validation(value, id);

    if (validationResult instanceof Promise) {
      setMessage(null);

      validationResult.then(value => {
        setMessage(value);
        resolve(!value);
      });
    } else {
      setMessage(validationResult);
      resolve(!validationResult);
    }
  });

  return (
    <TextField
      {...props}
      style={{ minHeight: '5em' }}
      value={value}
      helperText={message}
      error={!!message}
      onBlur={handleBlur}
      onChange={e => handleChange(e)}
    />
  );
});

export default TextInput;