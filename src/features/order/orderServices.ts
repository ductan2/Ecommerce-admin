
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getOrders= async () => {
   
   return http.get('/products/get-all-orders',auth)
}


const ordersServices = {
   getOrders,
}
export default ordersServices;