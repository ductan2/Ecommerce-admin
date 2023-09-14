import axios, { type AxiosError, AxiosInstance } from "axios"
import { backend_url } from "./dir";
import swal from "sweetalert2";


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
               // if (error.response?.status === 500) {
               //    swal({
               //       title: 'Errors!',
               //       text: "Server error",
               //       type: 'error',
               //    })
               // }

               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               const data = error.response?.data as object | null | any | string

               if (typeof data === "string" && data.includes("jwt expired")) {
                  localStorage.clear()
                  window.location.href = "/admin/login"
               }
               if (data[0]?.message) {
                  swal({
                     title: 'Errors!',
                     text: data[0].message || "Server error",
                     type: 'error',
                  })
               }
               if (data === undefined) {
                  swal({
                     title: 'Errors!',
                     text: data.message || "Server error",
                     type: 'error',
                  })
               }

            }
            return Promise.reject(error);
         }
      )
   }

}
const http = new Http().instace

export default http