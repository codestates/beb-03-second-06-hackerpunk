import { useErrorHandler } from '../common';

const useErrorBang = () => {
  const handleError = useErrorHandler();
  return (message = '', reason = '') =>
    handleError({
      message,
      response: {
        data: {
          message: reason,
        },
      },
    });
};

export default useErrorBang;
