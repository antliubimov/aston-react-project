import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/mainPage/MainPage';
import { Navibar } from './components/navbar/Navibar';
import { Searc } from './components/searc/Searc';
import { FAVORITE_ROUTE, MAIN_ROUTE, SEARCH_ROUTE } from './utils/consts';
import { Favorite } from './components/favorite/Favorite';

const App = () => {
  return (
    <BrowserRouter>
      <Navibar />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
          <Route path={MAIN_ROUTE} element={<MainPage />} />
          <Route path={SEARCH_ROUTE} element={<Searc />} />
          <Route path={FAVORITE_ROUTE} element={<Favorite />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
