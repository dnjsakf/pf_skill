import React, { Suspense } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import { CircularProgress } from 'components/Progress';

const CircularSuspense = props => (
  <ErrorBoundary>
    <Suspense fallback={ <CircularProgress /> }>
      { props.children }
    </Suspense>
  </ErrorBoundary>
)

export default CircularSuspense;