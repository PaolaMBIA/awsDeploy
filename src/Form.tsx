import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Control,
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";

export interface Inputs {
  firstName: string;
  lastName: string;
  ReactDatepicker: Date;
}

interface FormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

export function Form<T extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
}: FormProps<T>) {
  const { register, handleSubmit, control } = useForm<T>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children) &&
          children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    control,
                    key: child.props.name,
                  },
                })
              : child;
          })}
      </form>
    </>
  );
}

interface InputProps {
  name: string;
  ariaLabel: string;
  register?: UseFormRegister<FieldValues>;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  error?: boolean;
  label?: string;
}

export function Input({
  name,
  register,
  disabled,
  ariaLabel,
  label,
}: InputProps) {
  return (
    <>
      {register ? (
        <>
          <label>{label}</label>
          <input
            aria-label={ariaLabel}
            disabled={disabled}
            {...register(name)}
          />
        </>
      ) : (
        <p>cc</p>
      )}
    </>
  );
}

interface DatePickerProps {
  name: string;
  control?: Control<FieldValues, object>;
}

export function DatePickerComponent({ name, control }: DatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <ReactDatePicker selected={value} onChange={onChange} />
      )}
    />
  );
}

interface SelectProps {
  name: string;
  register?: UseFormRegister<FieldValues>;
  options: string[];
}

export function Select({ register, options, name, ...rest }: SelectProps) {
  return (
    <>
      {register && (
        <select {...register(name)} {...rest}>
          {options.map((value: string) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
