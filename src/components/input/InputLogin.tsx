import React from 'react'
import { UseFormRegister } from "react-hook-form";
import { FormDataLogin } from '../../types/apiType/user.type';

interface Props {
   type: React.HTMLInputTypeAttribute;
   errorMessage?: string;
   placeholder?: string;
   name: "email" | "password";
   register: UseFormRegister<FormDataLogin>
   classname?: string
   classNameInput?: string
}
export const InputLogin = ({ classname, name, register, type, errorMessage, placeholder, classNameInput }: Props) => {

   return (
      <div className={` ${classname}`}>
         <input type={type}
            className={`form-control ${classNameInput} `}
            placeholder={placeholder}
            {...register(name)} />
         <div className="">
            <span className='text-danger'>{errorMessage}</span>
         </div>
      </div>
   )
}
