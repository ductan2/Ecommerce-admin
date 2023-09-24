import React from 'react'
import { Control, useController } from 'react-hook-form'


interface props extends React.InputHTMLAttributes<HTMLInputElement> {
   type: React.HTMLInputTypeAttribute
   errorMessage?: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control?: Control<any>;
   name?: string;
   id?: string;
   label: string
}
export const InputCustom = ({type, name, id, placeholder, control, label, className, errorMessage, ...rest }: props) => {

   const { field } = useController({
      control,
      name: name || "",
      defaultValue:  "",
   });
   return (
      <>
         <div className="mb-4">
            <label className="form-label">{label}</label>
            <input className={`form-control ${className}`} id={id}
               placeholder={placeholder} type={type}
               {...rest} {...field} />
            {errorMessage ? <span className="text-danger">{errorMessage}</span> : null}
         </div>
      </>
   )
}
