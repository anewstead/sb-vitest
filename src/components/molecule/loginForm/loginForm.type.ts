import type { IMyInputProps } from "@src/components/atom/myInput/myInput.type";

export type ILoginFormProps = {
  email: IMyInputProps;
  password: IMyInputProps;
  onSubmit: (e: React.FormEvent) => void;
};
