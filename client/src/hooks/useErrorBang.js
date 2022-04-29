import { useErrorHandler } from "../common";

const useErrorBang = () => {
  const handleError = useErrorHandler();
  return (message = "", reason = "", value = null) => {
    return handleError({
      message,
      response: {
        data: {
          message: reason,
          value,
        },
      },
    });
  };
};

export default useErrorBang;
