import React, { MutableRefObject, SetStateAction } from 'react';
import { MovieType } from '../../types/ReduxTypes/MovieType';
import cl from './DropDown.module.css';
import { ROUTES } from '../../routes/routes';
import { NavLink } from 'react-router-dom';

interface DropDownProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  films: MovieType[];
  dropDownRef: MutableRefObject<HTMLDivElement | null>;
}

export function DropDown({
  visible,
  setVisible,
  films,
  dropDownRef,
}: DropDownProps) {
  const rootClasses = [cl.dropDown, cl.active];
  if (!visible || !films.length) {
    return null;
  }

  const handleItemClick = () => {
    setVisible(false);
  };

  return (
    <div ref={dropDownRef} className={rootClasses.join(' ')}>
      <div className={cl.dropDownContent}>
        {films.map((film) => {
          return (
            <NavLink
              onClick={handleItemClick}
              className={cl.dropDownItems}
              key={film.imdbID}
              to={`${ROUTES.FILM}/:${film.imdbID}`}
            >
              {film.Title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
