import { React } from '..';

function ErrorNotice({ ...errorProps }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{errorProps.error.message}</pre>

      <button onClick={() => errorProps.resetErrorBoundary(errorProps.error)}>
        Try again
      </button>
    </div>
  );
}

export default ErrorNotice;
