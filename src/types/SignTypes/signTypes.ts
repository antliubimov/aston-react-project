export interface IUser {
  username: string;
  password: string;
}

export interface ISigninUser extends IUser {
  isSignIn: boolean;
}

export interface ISignupUser extends IUser {
  confirmPassword: string;
}

export interface IUsers{
  [key: string]: IUser,
}
