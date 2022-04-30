import { Suspense, ErrorBoundary, ErrorNotice, Spinner } from '..';

function AsyncBoundary({
  children,
  fallback = <Spinner />,
  errorFallback = (props) => <ErrorNotice {...props} />,
  ...restErrorBoundaryAttributes
} = {}) {
  if (!errorFallback) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
  return (
    <ErrorBoundary
      fallbackRender={errorFallback}
      {...restErrorBoundaryAttributes}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
