"use client";
import React, { forwardRef, ReactNode, Ref, useState } from "react";
import { Input } from "../ui/input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ErrorMessage, Field } from "formik";

interface PasswordInputProps {
  placeholder: string;
  label: string;
  icon: ReactNode;
  name: string;
}

const PasswordInput = forwardRef(
  (
    { placeholder, icon, name, label }: PasswordInputProps,
    ref?: Ref<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div>
        <label className="font-bold">{label}</label>
        <div className="relative flex items-center">
          <Field
            className="px-7"
            as={Input}
            ref={ref}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            name={`${name}`}
            maxLength={30}
          />

          <span
            title="Mostrar u ocultar contraseña"
            onClick={togglePasswordVisibility}
            className="absolute text-blue-500 inset-y-0 right-2 flex items-center pr-2 cursor-pointer hover:text-green-500"
          >
            {showPassword ? (
              <AiFillEye size={25} />
            ) : (
              <AiFillEyeInvisible size={25} />
            )}
          </span>
          <span className="absolute left-0">{icon}</span>
        </div>
        <ErrorMessage
          name={`${name}`}
          component="div"
          className="text-red-500 font-bold"
        />
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
