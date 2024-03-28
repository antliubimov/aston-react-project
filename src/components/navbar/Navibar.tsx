import React from 'react';
import logo from '../../images/logo.jpg';
import { Navbar, Nav } from 'react-bootstrap';
import './NavibarStyles.css';
import { NavLink } from 'react-router-dom';
import { FAVORITE_ROUTE, MAIN_ROUTE, SEARCH_ROUTE } from '../../utils/consts';

export const Navibar = () => {
  return (
    <Navbar expand="sm" bg="dark" variant="dark" className="">
      <Nav className="mr-auto nav-link ">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to={MAIN_ROUTE} className="nav-link">
              <img src={logo} alt="logo" className="logo" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={MAIN_ROUTE} className="nav-link">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={SEARCH_ROUTE} className="nav-link">
              Поиск
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={FAVORITE_ROUTE} className="nav-link">
              История
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="" className="nav-link">
              Избранное
            </NavLink>
          </li>
          <input
            className="form-control me-2 input"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
          <li className="nav-item">
            <NavLink to="" className="nav-link">
              Регистрация
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="" className="nav-link">
              Войти
            </NavLink>
          </li>
        </ul>
        <form className="d-flex"></form>
      </Nav>
    </Navbar>
  );
};
