
import { AuthUser } from "./apiType/user.type";
export interface MenuItemLink {
   href?: string;
   icon?: string;
   text?: string;
}

export interface SubmenuItem {
   links: MenuItemLink[];
}

export interface MenuItem {
   menu_item: {
      menu_link: MenuItemLink;
      submenu?: SubmenuItem;
   };
}
export interface ResponseApi<Data> {
   message: string
   data: Data
   isLoading?: boolean
   isSuccess?: boolean;
}

export type ResponseMessageType = {
   message: string
   status: number
   error?: string
   path?: 'email' | 'password'
}
export type UploadImageType = {
   url?: string
   asset_id?: string
   public_id?: string
 }

export interface MenuDataType {
   menu_aside: MenuItem[];
}

export interface stateType {
   auth: AuthUser;
}

export type AsyncState<T> = {
   data: T[];
   isError?: boolean;
   isLoading?: boolean;
   isSuccess?: boolean;
   message?: string
   dataUpdate?: T
};
// export interface AsyncThunkConfig {
//    state: RootState; // Replace 'RootState' with your actual RootState type
//    dispatch: AppDispatch; // Replace 'AppDispatch' with your actual AppDispatch type
//    extra: ExtraArguments; // Replace 'ExtraArguments' with any extra dependencies you want to pass
// }