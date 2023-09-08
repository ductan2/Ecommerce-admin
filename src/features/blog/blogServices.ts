
import http from "../../utils/http";


export const getAllBlog = async () => {
   return http.get('/blogs/get-all')
}


const BlogServices = {
   getAllBlog,
}
export default BlogServices;