
import http from "../../utils/http";


export const loginAccount = (body: { email: string, password: string }) =>
   http.post('/users/login-admin', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

const authServices = {
   loginAccount,
}
export default authServices;