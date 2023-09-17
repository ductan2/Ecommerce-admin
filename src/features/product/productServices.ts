
import { Product } from "../../types/apiType/product.type";
import http from "../../utils/http";


export const getAllProductServices = async (query?: string, page?: number, limit?: number) => {
   if (!query) return http.get(`/products/get-all-products?page=${page}&limit=${limit}`)
   return http.get(`/products/get-all-products?${query}page=${page}`,)
}

export const createProductServices = async (data: Product) => {
   return http.post('/products', data)
}
export const getProductAndPageServices = async () => {
   return http.get('/products/count');
}
const productServices = {
   getAllProductServices,
   createProductServices,
   getProductAndPageServices
}

export default productServices;