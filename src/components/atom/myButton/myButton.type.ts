export type IMyButtonProps = {
  secondary?: boolean;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};
