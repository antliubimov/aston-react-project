import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';
import { LayoutComponent } from '../components/LayoutComponent';
import { ProtectedRoute } from '../components/ProtectedRoute';

const MainPage = lazy(() =>
  import('../pages/MainPage/MainPage').then(({ MainPage }) => ({
    default: MainPage,
  })),
);

const SigninPage = lazy(() =>
  import('../pages/SinginPage/SigninPage').then(({ SigninPage }) => ({
    default: SigninPage,
  })),
);

const SignupPage = lazy(() =>
  import('../pages/SignupPage/SignupPage').then(({ SignupPage }) => ({
    default: SignupPage,
  })),
);

const SearchPage = lazy(() =>
  import('../pages/SearchPage/SearchPage').then(({ SearchPage }) => ({
    default: SearchPage,
  })),
);

const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage').then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage').then(({ FavoritesPage }) => ({
    default: FavoritesPage,
  })),
);
const HistoryPage = lazy(() =>
  import('../pages/HistoryPage/HistoryPage').then(({ HistoryPage }) => ({
    default: HistoryPage,
  })),
);

import { FilmPage } from '../pages/FilmPage/FilmPage';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <LayoutComponent />,
    children: [
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
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
        path: ROUTES.FILM,
        element: <FilmPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.SEARCH,
            element: <SearchPage />,
          },
          {
            path: ROUTES.FAVORITES,
            element: <FavoritesPage />,
          },
          {
            path: ROUTES.HISTORY,
            element: <HistoryPage />,
          },
        ],
      },
    ],
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;
