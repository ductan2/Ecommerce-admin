
import { UserLocal } from "../../utils/dir";
import http from "../../utils/http";


export const getOrders= async () => {
   
   return http.get('/products/get-all-orders',{ withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${UserLocal.token}` } })
}


const ordersServices = {
   getOrders,
}
export default ordersServices;