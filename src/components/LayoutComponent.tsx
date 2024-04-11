import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { Navibar } from './navbar/Navibar';

export const LayoutComponent = () => {
  return (
    <>
      <Navibar />
      <ErrorBoundary>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
