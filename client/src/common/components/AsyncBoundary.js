import { Suspense, ErrorBoundary } from '..';

function AsyncBoundary({
  children,
  fallback,
  errorFallback,
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
