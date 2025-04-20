/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from "@/utils/cn";
import { DatePicker, ErrorText, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from "@pellegrinidev/piggy-ui";
import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { NumericFormat } from "react-number-format";

interface FormFieldProps {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  className?: string;
  required?: boolean;
  [key: string]: any;
}

const FormField = ({
  name,
  label,
  component: Component,
  className,
  required,
  ...props
}: FormFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <Label htmlFor={name} required={required}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Component
            {...field}
            {...props}
            value={field.value ?? ''}
            className={cn("w-full", hasError && "border-red-500", props.className)}
            aria-invalid={hasError}
          />
        )}
      />

      {hasError && errorMessage && (
        <ErrorText>{String(errorMessage)}</ErrorText>
      )}
    </div>
  );
};

const FormFieldHorizontal = ({
  name,
  label,
  component: Component,
  required,
  className,
  ...props
}: FormFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message;

  return (
    <div className={cn("flex flex-col items-center justify-between gap-2 w-full", className)}>
      <Label htmlFor={name} required={required} className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Component
            {...field}
            {...props}
            className={cn(hasError && "border-red-500", props.className)}
            aria-invalid={hasError}
          />
        )}
      />

      {hasError && errorMessage && (
        <ErrorText className="col-span-2">{String(errorMessage)}</ErrorText>
      )}
    </div>
  );
};


interface TextInputProps extends Omit<FormFieldProps, 'component'> {
  type?: string;
}

const TextInput = ({ name, label, className, type = 'text', ...props }: TextInputProps) => {
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

const CurrencyInput = ({ value, onChange, ...props }: any) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onChange?.(values?.floatValue ?? null)}
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative
      {...props}
    />
  );
};

CurrencyInput.displayName = "CurrencyInput";

interface CurrencyTextInputProps {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
}

const CurrencyTextInput = ({
  name,
  label,
  className,
  required,
  ...props
}: CurrencyTextInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={CurrencyInput}
      className={className}
      required={required}
      {...props}
    />
  );
};

interface SelectOption {
  label: string;
  value: string;
}

interface SelectTextInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const SelectWrapper = ({
  value,
  onChange,
  options,
  placeholder,
  ...props
}: {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) => (
  <Select value={value} onValueChange={onChange} {...props}>
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const SelectInput = ({
  name,
  label,
  options,
  placeholder = "Selecione...",
  className,
  required,
  ...props
}: SelectTextInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={SelectWrapper}
      options={options}
      placeholder={placeholder}
      className={className}
      required={required}
      {...props}
    />
  );
};

interface DateTextInputProps {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const DateInput = ({
  name,
  label,
  className,
  required,
  placeholder = "Selecione uma data",
  ...props
}: DateTextInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={DatePicker}
      placeholder={placeholder}
      className={className}
      required={required}
      {...props}
    />
  );
};

interface GenericSwitchWrapperProps<T> {
  value: T;
  onChange: (val: T) => void;
  checkedValue?: T;
  uncheckedValue?: T;
}

const SwitchWrapper = <T extends any>({
  value,
  onChange,
  checkedValue = true as T,
  uncheckedValue = false as T,
  ...props
}: GenericSwitchWrapperProps<T> & Omit<React.ComponentProps<typeof Switch>, 'checked' | 'onCheckedChange'>) => (
  <Switch
    checked={value === checkedValue}
    onCheckedChange={(checked) => onChange(checked ? checkedValue : uncheckedValue)}
    {...props}
  />
);

interface SwitchInputProps<T = any> {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  checkedValue?: T;
  uncheckedValue?: T;
}

const SwitchInput = <T extends any>({
  name,
  label,
  className,
  required,
  checkedValue,
  uncheckedValue,
  ...props
}: SwitchInputProps<T>) => {
  return (
    <FormFieldHorizontal
      name={name}
      label={label}
      component={(fieldProps: any) => (
        <SwitchWrapper
          {...fieldProps}
          checkedValue={checkedValue}
          uncheckedValue={uncheckedValue}
        />
      )}
      className={className}
      required={required}
      {...props}
    />
  );
};

export { TextInput, CurrencyTextInput, SelectInput, DateInput, SwitchInput };
