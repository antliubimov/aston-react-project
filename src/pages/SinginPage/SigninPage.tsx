import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Data, SigninUser } from '../../types/SignTypes/signTypes';
import { ROUTES } from '../../routes/routes';
import { useAuth } from '../../core/hooks';
import signinImg from '../../assets/images/signin.svg';
import { getLocalStorageItem } from '../../utils/getLocalStorageItem';
import { SignInput } from '../../components/SignInput';
import { SignForm } from '../../components/SignForm';

export const SigninPage = () => {
  const initialState: SigninUser = {
    username: '',
    password: '',
    isSignIn: false,
  };
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const [signinData, setSigninData] = useState<SigninUser>(initialState);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const errors: Data = {
    username: 'Неверные логин или пароль',
    password: 'Неверные логин или пароль',
  };

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthFailed(false);
    const usersDB = getLocalStorageItem('usersDB');
    if (!usersDB) {
      throw new Error('Users database not found!');
    } else if (!usersDB?.[signinData.username] || usersDB?.[signinData.username]?.password !== signinData.password) {
      setIsAuthFailed(true);
    } else {
      signIn(signinData);
      navigate(ROUTES.MAIN);
    }
  }

  return (
    <SignForm
      title='Войти'
      imageSrc={signinImg}
      btnName='Войти'
      onSubmit={handleSubmit}
    >
      <SignInput
        label='Ваш логин'
        name='username'
        type='text'
        data={signinData}
        setData={setSigninData}
        isInvalid={isAuthFailed}
        errors={errors}
        mRef={usernameRef}
      />
      <SignInput
        label='Пароль'
        name='password'
        type='password'
        data={signinData}
        setData={setSigninData}
        isInvalid={isAuthFailed}
        errors={errors}
      />
    </SignForm>
  );
};
