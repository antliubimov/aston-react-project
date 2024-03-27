import React, { useEffect, useState, useMemo } from 'react';
import RouterConfig from './routes/routerConfig';
import { AuthContext } from './core/contexts';
import { SigninUser, Users } from './types/SignTypes/signTypes';
import './assets/styles/App.css';

type LayoutProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: LayoutProps) => {
  const json = localStorage.getItem('user');
  const currentUser: SigninUser | null = json ? JSON.parse(json) : null;
  const [user, setUser] = useState(currentUser ? currentUser : null);

  const signIn = (userData: SigninUser) => {
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

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
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
  const usersDB: Users = {
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
