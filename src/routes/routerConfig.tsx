import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import MainPage from '../pages/MainPage/MainPage';
import SigninPage from '../pages/SinginPage/SigninPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: routes.mainPagePath(),
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
    ],
  },
  {
    path: routes.signinPagePath(),
    element: <SigninPage />,
  },
  {
    path: routes.signupPagePath(),
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;