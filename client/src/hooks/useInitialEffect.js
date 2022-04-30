import { useState, useEffect } from "../common";

const useInitialEffect = (callback = (v) => v, dependency = []) => {
  const [__init, setInit] = useState(false);

  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, __init, callback]);

  useEffect(() => {
    setInit(true);
  }, []);
};

export default useInitialEffect;
