import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';
import MainPage from '../pages/MainPage/MainPage';
import { SigninPage } from '../pages/SinginPage/SigninPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PrivateOutlet } from '../components/PrivateOutlet';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { HistoryPage } from '../pages/HistoryPage/HistoryPage';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTES.SEARCH,
    element: <PrivateOutlet />,
    children: [
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: ROUTES.FAVORITES,
    element: <PrivateOutlet />,
    children: [
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
    ],
  },
  {
    path: ROUTES.HISTORY,
    element: <PrivateOutlet />,
    children: [
      {
        path: '/history',
        element: <HistoryPage />,
      },
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <SigninPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;