import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import signupImg from '../../assets/images/signup.svg';
import { useAuth } from '../../core/hooks';
import { ROUTES } from '../../routes/routes';
import { SignForm } from '../../components/SignForm';
import { SignInput } from '../../components/SignInput';
import { Data, SigninUser, SignupUser } from '../../types/SignTypes/signTypes';
import { getLocalStorageItem } from '../../utils/getLocalStorageItem';

class ValidationError extends Error {
  public path: string;
  constructor(message: string, path: string) {
    super(message);
    this.name = 'ValidationError';
    this.path = path;
  }
}

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'Пароли должны совпадать', (value, context) => value === context.parent.password),
});

const SignupPage = () => {
  const initialState: SignupUser = {
    username: '',
    password: '',
    confirmPassword: '',
  };
  const { signIn } = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [signupData, setSignupData] = useState(initialState);
  const [errors, setErrors]: [Data, React.Dispatch<React.SetStateAction<Data>>] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistrationFailed(false);
    try {
      await SignupSchema.validate(signupData, {abortEarly: false});
      const usersDB = getLocalStorageItem('usersDB');
      if (!usersDB) {
        throw new Error('Users database not found!');
      } else if (usersDB?.[signupData.username]) {
        throw new ValidationError('Такой пользователь уже существует', 'username' );
      }
      const data: SigninUser = {
        username: signupData.username,
        password: signupData.password,
        isSignIn: false,
      }
      signIn(data);
      navigate(ROUTES.MAIN);
    } catch (error) {
      setRegistrationFailed(true);
      const newErrors: Data = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          newErrors[err.path as string] = err.message;
        });
        setErrors(newErrors);
      } else if (error instanceof ValidationError) {
        newErrors[error.path] = error.message;
        setErrors(newErrors);
      } else {
        throw error;
      }
    }
  };

  return (
    <SignForm
      title='Регистрация'
      imageSrc={signupImg}
      btnName='Зарегистрироваться'
      onSubmit={handleSubmit}
    >
      <SignInput
        label='Имя пользователя'
        name='username'
        type='text'
        data={signupData}
        setData={setSignupData}
        isInvalid={registrationFailed && errors.username !== undefined}
        errors={errors}
        mRef={inputRef}
      />
      <SignInput
        label='Пароль'
        name='password'
        type='password'
        data={signupData}
        setData={setSignupData}
        isInvalid={registrationFailed && errors.password !== undefined}
        errors={errors}
      />
      <SignInput
        label='Подтвердите пароль'
        name='confirmPassword'
        type='password'
        data={signupData}
        setData={setSignupData}
        isInvalid={registrationFailed && errors.confirmPassword !== undefined}
        errors={errors}
      />
    </SignForm>
  );
};

export { SignupPage };
