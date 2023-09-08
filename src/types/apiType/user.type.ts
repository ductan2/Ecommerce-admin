import { Schema } from "../../utils/rules";
import { ResponseMessageType } from "../CommonTpye";





export type FormDataLogin = Pick<Schema, 'email' | 'password'>
export interface User {
   email: string;
   password: string;

}

export interface AuthUser {
   _id?: string;
   firstname?: string;
   lastname?: string;
   email?: string;
   mobile?: string;
   role?: string;
   token?: string;
}

export type AuthState = {
   user: AuthUser;
   isSuccess: boolean;
   isLoading: boolean;
   message: ResponseMessageType[];
   isError: boolean;
};

export interface User {
   _id: string;
   firstname?: string;
   lastname?: string;
   email: string;
   mobile?: string;
   role?: string;
   address?: string;
   avatar?: string;
   blocked?: boolean;
   created_at?: Date; // Có thể chuyển thành kiểu Date 
   updated_at?: Date; // Có thể chuyển thành kiểu Date 
   wishlist?: string[]; // Mảng các chuỗi
}