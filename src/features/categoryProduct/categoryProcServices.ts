
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getCategoryProductService = async () => {
   return http.get('/procduct-categorys/get-all')
}
export const createCategoryProductService = async (data: { title: string }) => {
   return http.post('/procduct-categorys/', data, auth)
}
export const updateCategoryProductService = async (id: string, data: { title: string }) => {
   return http.put(`/procduct-categorys/${id}`, data, auth)
}
export const deleteCategoryProductService = async (id: string) => {
   return http.delete(`/procduct-categorys/${id}`, auth)
}

const CategoryProductServices = {
   getCategoryProductService,
   createCategoryProductService,
   updateCategoryProductService,
   deleteCategoryProductService
}
export default CategoryProductServices;