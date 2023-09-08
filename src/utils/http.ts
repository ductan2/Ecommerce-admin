import axios, { type AxiosError, AxiosInstance } from "axios"
import { toast } from "react-toastify";
import { backend_url } from "./dir";


class Http {
   instace: AxiosInstance
   constructor() {
      this.instace = axios.create({
         baseURL: backend_url,
         timeout: 10000,
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }
      })
      // handle response from server
      this.instace.interceptors.response.use(
         function (response) {
            return response;
         },
         function (error: AxiosError) {
            if (error.response?.status !== 422) {
               console.log(error.response?.status)
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               const data = error.response?.data as object | null | any
               const message = data.message || error.message
               toast.error(message, {
                  position: toast.POSITION.TOP_CENTER
                });
            }
            return Promise.reject(error);
         }
      )
   }

}
const http = new Http().instace

export default http