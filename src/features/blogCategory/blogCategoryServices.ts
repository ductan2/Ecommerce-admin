
import http from "../../utils/http";


export const getCategoryBlog = async () => {
   return http.get('/blog-categorys/get-all')
}


const BlogCategoryServices = {
   getCategoryBlog,
}
export default BlogCategoryServices;