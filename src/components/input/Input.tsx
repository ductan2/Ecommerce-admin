import React from 'react'

interface props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  classNameInput?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({ type, name, id, placeholder, className, classNameInput, errorMessage, value, onChange }: props) => {

  // const handleType = () => {
  //   if (type === 'password') {
  //     return openEye ? 'text' : 'password'
  //   }
  //   return type
  // }
  return (
    <div className={`relative ${className}`}>
      <input className={`form-control ${classNameInput}`} id={id}
        name={name} placeholder={placeholder} type={type} value={value}
        onChange={onChange} />
      {errorMessage ? <span className="text-danger">{errorMessage}</span> : null}
    </div>
  )
}
