import FilledButtonComponent from "src/components/button/filledButton";
import OutlinedButtonComponent from "src/components/button/outlinedButton";

export interface IButton {
  className?: string;
  onClick?: (e: any) => void;
  title: React.ReactNode | string;
  isBlueButton?: boolean;
}
export const FilledButton = FilledButtonComponent;
export const OutlinedButton = OutlinedButtonComponent;
