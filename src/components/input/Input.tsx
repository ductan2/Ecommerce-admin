import React from 'react'
import { Control, useController } from 'react-hook-form'
interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  name?: string;
  id?: string;
  classNameInput?: string;
}
export const Input = ({ type, name, id, placeholder, control, className, classNameInput, errorMessage, ...rest }: props) => {
  // const handleType = () => {
  //   if (type === 'password') {
  //     return openEye ? 'text' : 'password'
  //   }
  //   return type
  // }

  const { field } = useController({
    control,
    name: name || "",
    defaultValue: "",

  });

  return (
    <div className={`relative ${className}`}>
      <input className={`form-control ${classNameInput}`} id={id}
        placeholder={placeholder} type={type} 
        {...rest} {...field}/>
      {errorMessage ? <span className="text-danger">{errorMessage}</span> : null}
    </div>
  )
}
