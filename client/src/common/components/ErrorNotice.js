import { React, motion } from '..';

function ErrorNotice({ ...errorProps }) {
  const { error: { message, response: { data } = {} } = {} } = errorProps;
  return (
    <motion.div role="alert">
      <p>Something went wrong:</p>
      <pre>{message}</pre>
      <pre>Reason: {data?.message}</pre>

      <motion.button onClick={() => errorProps.resetErrorBoundary(errorProps.error)}>
        Try again
      </motion.button>
    </motion.div>
  );
}

export default ErrorNotice;
