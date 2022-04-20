import { Suspense } from '..';
import { ErrorBoundary } from 'react-error-boundary';

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
