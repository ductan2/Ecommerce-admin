
import http from "../../utils/http";


export const getProducts = async () => {
   return http.get('/products/get-all-products',)
}


const productServices = {
   getProducts,
}
export default productServices;