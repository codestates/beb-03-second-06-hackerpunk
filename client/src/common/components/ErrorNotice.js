import { React, motion, useFocus } from "..";

function ErrorNotice({ ...errorProps }) {
  const { error: { message, response: { data } = {} } = {} } = errorProps;
  const [focusRef] = useFocus();
  return (
    <motion.div
      style={{
        wordBreak: "break-all",
      }}
      role="alert"
    >
      <p>Something went wrong:</p>
      <pre>{message}</pre>
      <pre>Reason: {data?.message}</pre>

      <motion.button
        ref={focusRef}
        onClick={() => errorProps.resetErrorBoundary(errorProps.error)}
      >
        Try again
      </motion.button>
    </motion.div>
  );
}

export default ErrorNotice;
