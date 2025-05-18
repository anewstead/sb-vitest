export type IMyInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder?: string;
  required?: boolean;
  helperText?: string;
};
