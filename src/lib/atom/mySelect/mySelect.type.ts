export type IMySelectItem = {
  label: string;
  value: string;
};

export type IMySelectProps = {
  labelText: string;
  initialValue: string;
  onChange: (selected: IMySelectItem) => void;
  items: IMySelectItem[];
  id?: string;
};
