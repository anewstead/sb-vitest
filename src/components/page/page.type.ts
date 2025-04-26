export type PageProps = {
  user?: {
    name: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
};
