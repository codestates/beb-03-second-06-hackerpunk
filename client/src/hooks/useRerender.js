import { useState } from "../common";

const useRerender = (callback = () => {}) => {
  const [_refresh, _setRefresh] = useState(false);
  const refresh = () => {
    callback();
    _setRefresh(!_refresh);
  };
  return refresh;
};

export default useRerender;
