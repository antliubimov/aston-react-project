import React from 'react';
import { Outlet } from 'react-router-dom';
import Navibar from './navbar/Navibar';
import { ErrorBoundary } from './ErrorBoundary';

export const LayoutComponent = () => {
  return (
    <>
      <Navibar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
}