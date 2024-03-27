import { createContext } from 'react';

import { SigninUser } from '../../types/SignTypes/signTypes';

interface IAuthContext {
  user: SigninUser | null;
  signIn: (userData: SigninUser) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);