import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes/routes';
import { fetchFilmsToNavbarInput } from '../../core/slices/navbarInputSlices/FetchFilmsToNavbarInput';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { stateFilmsToNavbarInput } from '../../core/selectors/selectors';
import { Loader } from '../loader/Loader';
import { DropDown } from '../dropDown/DropDown';
import { useDebounce } from '../../core/hooks/useDebounce';
import { useOutsideClick } from '../../core/hooks/useOutsideClick';

export const NavbarInput = () => {
  const { filmsToNavbarInput, isLoading, errorCode } = useAppSelector(
    stateFilmsToNavbarInput,
  );
  const [navbarInputValue, setNavbarInputValue] = useState('');
  const [dropDown, setDropDown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debouncedNavbarInputValue = useDebounce(navbarInputValue);
  const dropDownRef = useRef(null);
  const inputRef = useRef(null);
  useOutsideClick(dropDownRef, () => setDropDown(false), inputRef);

  useEffect(() => {
    if (debouncedNavbarInputValue.length < 3) {
      return;
    }
    dispatch(fetchFilmsToNavbarInput(debouncedNavbarInputValue));
  }, [debouncedNavbarInputValue]);

  useEffect(() => {
    if (!navbarInputValue) {
      setDropDown(false);
      return;
    }
    setDropDown(true);
  }, [navbarInputValue]);

  const escapeDropDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setDropDown(false);
    }
  };

  const onChangeNavbarInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNavbarInputValue(event.target.value);
  };

  const handleSearchForm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setDropDown(false);
      navigate(ROUTES.SEARCH);
    }
  };

  return (
    <div className="navbar_input">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Поиск"
        aria-label=""
        value={navbarInputValue}
        onKeyUp={escapeDropDown}
        onChange={onChangeNavbarInputValue}
        onKeyDown={handleSearchForm}
        ref={inputRef}
      />
      <DropDown
        visible={dropDown}
        setVisible={setDropDown}
        films={filmsToNavbarInput}
        dropDownRef={dropDownRef}
      />

      {isLoading && <Loader />}
      {errorCode && <h3 className="error">Фильм не найден</h3>}
    </div>
  );
};
