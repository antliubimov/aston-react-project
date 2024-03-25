import React, { useEffect, useState, useMemo } from 'react';
import RouterConfig from './routes/routerConfig';
import { AuthContext } from './core/contexts';
import { ISigninUser, IUsers } from './types/SignTypes/signTypes';
import './assets/styles/App.css';

type LayoutProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: LayoutProps) => {
  const json = localStorage.getItem('user');
  const currentUser: ISigninUser | null = json ? JSON.parse(json) : null;
  const [user, setUser] = useState(currentUser ? currentUser : null);

  const signIn = (userData: ISigninUser) => {
    userData = {...userData, isSignIn: true};
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({
      username: userData.username,
      password: userData.password,
      isSignIn: true,
    });
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // const getAuthHeader = () => {
  //   const userData = JSON.parse(localStorage.getItem('user'));
  //   return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  // };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      // getAuthHeader,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
function App() {
  const usersDB: IUsers = {
    admin: {username: 'admin', password: 'admin'},
  };

  useEffect(() => {
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <RouterConfig />
      </div>
    </AuthProvider>
  );
}

export default App;
