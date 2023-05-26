import { Control } from "react-hook-form";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type ControlledInputProps = InputProps & {
  name: string;
  control: Control<any>;
};
