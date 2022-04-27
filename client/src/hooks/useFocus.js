import { useRef, useEffect } from "../common";

/**
 *
 * @param {*} { start = true }
 * @returns [ref, focus]
 */
const useFocus = ({ start = true } = {}) => {
  const ref = useRef(null);
  const focus = () => {
    if (ref.current) ref.current.focus();
  };
  useEffect(() => {
    if (start) focus();
  }, [start, ref]);
  return [ref, focus];
};

export default useFocus;
