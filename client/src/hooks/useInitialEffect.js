import { useState, useEffect } from '../common';

const useInitialEffect = (callback = (v) => v, dependency = []) => {
  const [__init, setInit] = useState(false);

  useEffect(() => {
    callback();
  }, [...dependency, __init]);

  useEffect(() => {
    setInit(true);
  }, []);
};

export default useInitialEffect;
