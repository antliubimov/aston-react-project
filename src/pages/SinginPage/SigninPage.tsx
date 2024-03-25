import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Image,
} from 'react-bootstrap';
import { ISigninUser, IUsers } from '../../types/SignTypes/signTypes';
import routes from '../../routes/routes';
import { useAuth } from '../../core/hooks';
import loginImg from '../../assets/images/signin.svg';


const SigninPage = () => {
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const [signinData, setSigninData] = useState<ISigninUser>({
    username: '',
    password: '',
    isSignIn: false,
  });
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthFailed(false);
    const json = localStorage.getItem('usersDB');
    const db: IUsers | null = json ? JSON.parse(json) : null;
    if (!db) {
      throw new Error('Users database not found!');
    } else if (!db?.[signinData.username] || db?.[signinData.username]?.password !== signinData.password) {
      setIsAuthFailed(true);
    } else {
      signIn(signinData);
      const to = routes.mainPagePath();
      navigate(to);
    }
  }

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={loginImg} alt="Войти" fluid />
        </div>
        <div className="w-50">
          <h1>Войти</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group className="form-floating mb-3">
              <Form.Control
                onChange={(e) => setSigninData({...signinData, username: e.target.value})}
                value={signinData.username}
                ref={usernameRef}
                id="username"
                name="username"
                type="text"
                placeholder="Ваш логин"
                autoComplete="username"
                isInvalid={isAuthFailed}
                required
              />
              <label htmlFor="username">
                Ваш логин
              </label>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                onChange={(e) => setSigninData({...signinData, password: e.target.value}) }
                value={signinData.password}
                id="password"
                type="password"
                placeholder="Пароль"
                name="password"
                autoComplete="current-password"
                isInvalid={isAuthFailed}
                required
              />
              <label htmlFor="password">
                Пароль
              </label>
              {isAuthFailed && <Form.Control.Feedback type="invalid" tooltip>Неверные логин или пароль</Form.Control.Feedback>}
            </Form.Group>
            <Button variant="outline-primary" type="submit">Войти</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SigninPage;
