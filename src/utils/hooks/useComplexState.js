import { useState } from 'react';

const useComplexState = (stateObject) => {
  const [ props, state ] = useState(stateObject);

  return {
    properties: props,
    setState: (properties) => {
      state({ ...props,...properties });
    }
  };
}

export default useComplexState;