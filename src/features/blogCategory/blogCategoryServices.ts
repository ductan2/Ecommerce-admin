
import http from "../../utils/http";


export const getCategoryBlogServices = async () => {
   return http.get('/blog-categorys/get-all')
}
export const createCategoryBlogServices = async (data: { title: string }) => {
   return http.post('/blog-categorys', { title: data.title })
}
export const deleteBlogCategoryServices = async (id: string) => {
   return http.delete(`/blog-categorys/${id}` )

}
export const updateBlogCategoryServices = async (id: string, title: string) => {
   return http.put(`/blog-categorys/${id}`, { title: title } )
}
export const getBlogCategoryByIdServices = async (id: string) => {
   return http.get(`/blog-categorys/${id}`)
}
const BlogCategoryServices = {
   getCategoryBlogServices,
   createCategoryBlogServices,
   deleteBlogCategoryServices,
   updateBlogCategoryServices,
   getBlogCategoryByIdServices
}
export default BlogCategoryServices;