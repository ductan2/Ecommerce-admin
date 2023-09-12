
import { UserLocal } from "../../utils/dir";
import http from "../../utils/http";


export const getColorsServices = async () => {
   return http.get('/colors/get-all')
}
export const createColorServices = async (data: { title: string }) => {
   return http.post('/colors', { title: data.title }, { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${UserLocal.token}` } })
}
export const deleteColorServices = async (id: string) => {
   return http.delete(`/colors/${id}`, { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${UserLocal.token}` } })

}
export const updateColorServices = async (id: string, title: string) => {
   return http.put(`/colors/${id}`, { title: title }, { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${UserLocal.token}` } })
}
const colorServices = {
   getColorsServices,
   createColorServices,
   deleteColorServices,
   updateColorServices

}
export default colorServices;