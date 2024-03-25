import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Navibar from './components/navbar/Navibar';
import Searc from './components/searc/Searc';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navibar />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/mainPage" />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/searc" element={<Searc />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
