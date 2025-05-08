export type IUser = {
  name: string;
};

export type ILoginBarProps = {
  user?: {
    name: string;
  };
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  welcomeText: string;
  loginText: string;
  logoutText: string;
  signupText: string;
};
