export type ILoginFormProps = {
  emailLabel: string;
  emailValue: string;
  emailError?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  passwordLabel: string;
  passwordValue: string;
  passwordError?: string;
};
