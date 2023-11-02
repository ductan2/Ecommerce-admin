
import { Product } from "../../types/apiType/product.type";
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getAllProductServices = async (query?: string, page?: number, limit?: number) => {
   if (!query) return http.get(`/products/get-all-products?page=${page}&limit=${limit}`)
   return http.get(`/products/get-all-products?${query}&limit=${limit}&page=${page}`,)
}

export const createProductServices = async (data: Product) => {
   return http.post('/products', data,auth)
}
export const getProductAndPageServices = async () => {
   return http.get('/products/count');
}
export const updateProductServices = async (data: Product, id: string) => {
   return http.patch(`/products/${id}`, data,auth)
}
export const getAProductServices=async(id:string)=>{
   return http.get(`/products/${id}`)
}
export const deleteProductService = async (id: string) => {
   return http.delete(`/products/${id}`,auth)
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