export type User = {
  name: string;
};

export type HeaderProps = {
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
