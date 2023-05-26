import React, { ForwardedRef, forwardRef, useState } from "react";
import { Controller } from "react-hook-form";
import { InputProps, ControlledInputProps } from "./controlledInput.types";

const Input = ({ className, ...inputProps }: InputProps) => {
  const [_, setInputValue] = useState<React.ChangeEvent<HTMLInputElement>>();

  return (
    <input
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e)}
      className={className}
      {...inputProps}
    />
  );
};

export const ControlledInput = ({
  name,
  placeholder,
  control,
  ...props
}: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Input
            placeholder={placeholder}
            onChange={field.onChange}
            value={field.value ?? ""}
            {...props}
          />
        );
      }}
    />
  );
};
