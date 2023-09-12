
import { UploadImageType } from "../../types/CommonTpye";
import http from "../../utils/http";


export const getBrandsServices = async () => {
   return http.get('/brands/get-all')
}
export const createbrandServices = async (data: { title: string, images?: UploadImageType }) => {
   return http.post('/brands', { title: data.title, images: data.images })
}
export const deleteBrandServices = async (id: string) => {
   return http.delete(`/brands/${id}`)
}
export const editBrandServices = async (data: { id: string, title: string, images: UploadImageType | string }) => {
   return http.put(`/brands/${data.id}`, { title: data.title, images: data.images })
}
const BrandsServices = {
   getBrandsServices,
   createbrandServices,
   deleteBrandServices,
   editBrandServices
}
export default BrandsServices;