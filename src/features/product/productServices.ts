
import { Product } from "../../types/apiType/product.type";
import http from "../../utils/http";


export const getAllProductServices = async (query?: string, page?: number, limit?: number) => {
   if (!query) return http.get(`/products/get-all-products?page=${page}&limit=${limit}`)
   return http.get(`/products/get-all-products?${query}&limit=${limit}&page=${page}`,)
}

export const createProductServices = async (data: Product) => {
   return http.post('/products', data)
}
export const getProductAndPageServices = async () => {
   return http.get('/products/count');
}
export const updateProductServices = async (data: Product, id: string) => {
   return http.patch(`/products/${id}`, data)
}
export const getAProductServices=async(id:string)=>{
   return http.get(`/products/${id}`)
}
export const deleteProductService = async (id: string) => {
   return http.delete(`/products/${id}`)
}
const productServices = {
   getAllProductServices,
   createProductServices,
   getProductAndPageServices,
   getAProductServices,
   updateProductServices,
   deleteProductService
}

export default productServices;