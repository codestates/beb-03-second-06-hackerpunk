import { useState, useCallback, useLayoutEffect } from "../common";
/**
 *
 * @param {*} middleware
 * @param {*} initialValue if the type is object, setValue will set object.value too
 * @returns [value, { value, onChange }, setValue]
 */
const useInput = ({ middleware = (...v) => v, initialValue = "" } = {}) => {
  const [value, _setValue] = useState("");

  useLayoutEffect(() => {
    _setValue(
      typeof initialValue === "object" ? initialValue.value : initialValue
    );
  }, [initialValue]);

  const setValue = useCallback(
    (v) => {
      _setValue(middleware(v));
      if (typeof initialValue === "object") {
        initialValue.value = v;
      }
    },
    [initialValue, middleware]
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
