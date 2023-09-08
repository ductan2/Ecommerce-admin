
import http from "../../utils/http";


export const getAllUsers = async () => {
   const user = JSON.parse(localStorage.getItem('user')!);
   return http.get('/users/get-all-user', { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${user.token}` } })
}


const customerServices = {
   getAllUsers,
}
export default customerServices;