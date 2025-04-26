export type User = {
  name: string;
};

export type HeaderProps = {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
};
