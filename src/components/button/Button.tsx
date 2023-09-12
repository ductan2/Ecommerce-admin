import React from "react"
import { Loading } from "../loading/Loading"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   isLoading?: boolean
}
export const Button = ({ className, type, children, isLoading, style, ...rest }: ButtonProps) => {
   return (
      <button type={type} className={className} style={style} {...rest}>{
         isLoading ? <Loading /> : children
      }</button>
   )
}
