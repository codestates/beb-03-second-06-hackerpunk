import { useState } from '../common';

const useInput = (middleware = (v) => v, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const onChange = ({ target } = {}) => {
    const retValue = middleware(target.value);
    if (typeof retValue === 'undefined') {
      setValue(target.value);
      return;
    }
    if (typeof retValue !== 'string') {
      throw new Error(`Unexpected Type ${typeof retValue}`);
    }
    setValue(retValue);
  };
  return [value, { value, onChange }, setValue];
};

export default useInput;
