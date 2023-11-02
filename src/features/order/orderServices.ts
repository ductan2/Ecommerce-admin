
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getOrders = async (search?: string) => {
   if (search) {
      return http.get(`/products/get-all-orders?search=${search}`, auth)
   }
   return http.get(`/products/get-all-orders`, auth)
}
export const updateStatusOrderServices = async (id: string, status: string) => {
   return http.put(`/users/order/update-status-order/${id}`, { status }, auth)
}

const ordersServices = {
   getOrders,
   updateStatusOrderServices
}
export default ordersServices;