import { React } from '..';

function ErrorNotice({ ...errorProps }) {
  const { error: { message, response: { data } = {} } = {} } = errorProps;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{message}</pre>
      <pre>Reason: {data?.message}</pre>

      <button onClick={() => errorProps.resetErrorBoundary(errorProps.error)}>
        Try again
      </button>
    </div>
  );
}

export default ErrorNotice;
