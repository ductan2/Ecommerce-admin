
import React from 'react'
import { Control, useController } from 'react-hook-form'

interface props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   label?: string
   name: string
   errorMessage?: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control?: Control<any>;
}
export const TextArea = ({ placeholder, errorMessage, label, name, control, ...rest }: props) => {

   const { field } = useController({
      control,
      name: name || "",
      defaultValue: "",
   });

   return (
      <>
         <div className="mb-4">
            <label className="form-label">{label}</label>
            <textarea placeholder={placeholder} className="form-control" rows={4} {...rest} {...field}></textarea>
            {errorMessage ? <span className="text-danger">{errorMessage}</span> : null}
         </div>
      </>
   )
}
