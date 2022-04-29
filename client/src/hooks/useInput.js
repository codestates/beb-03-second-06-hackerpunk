import { useState, useCallback } from "../common";
/**
 *
 * @param {*} middleware
 * @param {*} initialValue if the type is object, setValue will set object.value too
 * @returns [value, { value, onChange }, setValue]
 */
const useInput = ({ middleware = (v) => v, initialValue = "" } = {}) => {
  const [value, _setValue] = useState(
    typeof initialValue === "object" ? initialValue.value : initialValue
  );

  const setValue = useCallback(
    (v) => {
      _setValue(v);
      if (typeof initialValue === "object") {
        initialValue.value = v;
      }
    },
    [initialValue]
  );

  const onChange = useCallback(
    ({ target } = {}) => {
      const retValue = middleware(target.value);
      if (typeof retValue === "undefined") {
        setValue(target.value);
        return;
      }
      if (typeof retValue !== "string") {
        throw new Error(`Unexpected Type ${typeof retValue}`);
      }
      setValue(retValue);
    },
    [setValue, middleware]
  );
  return [value, { value, onChange }, setValue];
};

export default useInput;
