export type IMyInputProps = {
  labelText: string;
  initialValue: string;
  onChange: (value: string) => void;
  id?: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder?: string;
  required?: boolean;
};
