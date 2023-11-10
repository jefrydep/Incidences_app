"use client";
import { ErrorMessage, Field } from "formik";
import React, { ReactNode } from "react";
import { Input } from "../ui/input";
import { User2Icon } from "lucide-react";
interface ValuesInput {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  maxLength: number;
  icon: ReactNode;
}
const InputFormWithIcon = ({
  type,
  label,
  name,
  placeholder,
  maxLength,
  icon,
}: ValuesInput) => {
  return (
    <div>
      <label className="labelLogin font-bold">{label}</label>
      <div className="flex items-center   relative">
        <Field
          className="px-7"
          as={Input}
          type={`${type}`}
          placeholder={`${placeholder}`}
          name={`${name}`}
          //   autoComplete="username"
          maxLength={`${maxLength}`}
        />
        <span className=" absolute left-0">{icon}</span>
      </div>
      <ErrorMessage
        name={`${name}`}
        component="div"
        className="text-red-500 font-bold"
      />
    </div>
  );
};

export default InputFormWithIcon;
