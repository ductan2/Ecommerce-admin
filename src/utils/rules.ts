import type { RegisterOptions } from "react-hook-form";
import * as yup from "yup"
type Rules = { [key in 'email' | 'password']?: RegisterOptions }
export const getRules = (): Rules => ({
   email: {
      required: {
         value: true,
         message: "Email không được để trống"
      },
      pattern: {
         value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
         message: "Email không đúng định dạng"
      },
      maxLength: {
         value: 50,
         message: "Email không được vượt quá 50 ký tự"
      }
   },
   password: {
      required: {
         value: true,
         message: "Password không được để trống"
      },
      minLength: {
         value: 6,
         message: "Mật khẩu phải có ít nhất 6 ký tự"
      },
      maxLength: {
         value: 50,
         message: "Password không được vượt quá 50 ký tự"
      }
   },
})

export const schema = yup
   .object({
      email: yup.string().required("Email is required").email("Email is invalid"),
      password: yup.string().required("Password is required").min(6, "Password must be more than 6 character").max(50, "Password must be less than 50 character"),

   })

export type Schema = yup.InferType<typeof schema>