import React, { useEffect } from 'react';
import RouterConfig from './routes/routerConfig';
import { Users } from './types/SignTypes/signTypes';
import { AuthProvider } from './core/providers/authProvider';
import { FeatureFlagProvider } from './core/providers/featureFlagProvider';
import { getLocalStorageItem } from './utils/helpers/getLocalStorageItem';
import { USERS_DB } from './utils/constants/constants';
import './assets/styles/App.css';

const initialUsersDB: Users = {
  admin: { username: 'admin', password: 'admin' },
};

function App() {
  useEffect(() => {
    const usersDB = getLocalStorageItem<Users>(USERS_DB);
    if (!usersDB) {
      localStorage.setItem(USERS_DB, JSON.stringify(initialUsersDB));
    }
  }, []);

  return (
    <AuthProvider>
      <FeatureFlagProvider>
        <div className="App">
          <RouterConfig />
        </div>
      </FeatureFlagProvider>
    </AuthProvider>
  );
}

export default App;
