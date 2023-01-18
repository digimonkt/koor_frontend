import LabeledInputComponent from "src/components/input/labeledInput";
export interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  password?: boolean;
  title: string;
  subtitle?: string;
}
export const LabeledInput = LabeledInputComponent;
