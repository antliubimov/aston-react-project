import { createContext } from 'react';

import { ISigninUser } from '../../types/SignTypes/signTypes';

interface IAuthContext {
  user: ISigninUser | null;
  signIn: (userData: ISigninUser) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);