
import http from "../../utils/http";


export const  getColors= async () => {
   return http.get('/colors/get-all')
}


const colorServices = {
   getColors
}
export default colorServices;