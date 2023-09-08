
import http from "../../utils/http";


export const getCategoryProduct = async () => {
   return http.get('/procduct-categorys/get-all')
}


const CategoryProductServices = {
   getCategoryProduct,
}
export default CategoryProductServices;