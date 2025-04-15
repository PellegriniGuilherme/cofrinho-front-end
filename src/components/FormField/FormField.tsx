/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from "@/utils/cn";
import { ErrorText, Input, Label } from "@pellegrinidev/piggy-ui";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

const FormField = ({ name, label, component: Component, className, required, ...props }: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <Component
        id={name}
        {...register(name)}
        className={cn("w-full", hasError && "border-red-500")}
        aria-invalid={hasError}
        {...props}
      />
      {hasError && errorMessage && (
        <ErrorText>{String(errorMessage)}</ErrorText>
      )}
    </div>
  );
};

interface TextInputProps extends Omit<FormFieldProps, 'component'> {
  type?: string;
}

const TextInput = ({
  name,
  label,
  className,
  type = 'text',
  ...props
}: TextInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={Input}
      type={type}
      className={className}
      {...props}
    />
  );
};

export { TextInput };

