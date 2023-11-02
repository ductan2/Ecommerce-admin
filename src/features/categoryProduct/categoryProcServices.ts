
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getCategoryProductService = async () => {
   return http.get('/product-categorys/get-all')
}
export const createCategoryProductService = async (data: { title: string }) => {
   return http.post('/product-categorys/', data, auth)
}
export const updateCategoryProductService = async (id: string, data: { title: string }) => {
   return http.put(`/product-categorys/${id}`, data, auth)
}
export const deleteCategoryProductService = async (id: string) => {
   return http.delete(`/product-categorys/${id}`, auth)
}
export const getCategoryProductByIdService = async (id: string) => {
   return http.get(`/product-categorys/${id}`)
}
const CategoryProductServices = {
   getCategoryProductService,
   createCategoryProductService,
   updateCategoryProductService,
   deleteCategoryProductService,
   getCategoryProductByIdService
}
export default CategoryProductServices;