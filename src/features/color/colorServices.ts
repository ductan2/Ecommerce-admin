

import {  auth } from "../../utils/auth";
import http from "../../utils/http";


export const getColorsServices = async () => {
   return http.get('/colors/get-all')
}
export const createColorServices = async (data: { title: string }) => {
   return http.post('/colors', { title: data.title }, auth)
}
export const deleteColorServices = async (id: string) => {
   return http.delete(`/colors/${id}`,auth )

}
export const updateColorServices = async (id: string, title: string) => {
   return http.put(`/colors/${id}`, { title: title },auth )
}
export const getColorByIdServices = async (id: string) => {
   return http.get(`/colors/${id}`)
}
const colorServices = {
   getColorsServices,
   createColorServices,
   deleteColorServices,
   updateColorServices,
   getColorByIdServices

}
export default colorServices;