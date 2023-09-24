
import { Blog } from "../../types/apiType/blog.type";
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getAllBlogServices = async (query?: string) => {
   if (query) return http.get(`/blogs/get-all?${query}`)
   return http.get('/blogs/get-all')
}
export const createBlogServices = async (data: Blog) => {
   return http.post('/blogs', data, auth)
}
export const updateBlogServices = async (id: string, data: Blog) => {
   return http.patch(`/blogs/${id}`, data, auth)
}
export const deleteBlogServices = async (id: string) => {
   return http.delete(`/blogs/${id}`, auth)
}
export const getBlogByIdServices = async (id: string) => {
   return http.get(`/blogs/${id}`, auth)
}
const BlogServices = {
   getAllBlogServices,
   createBlogServices,
   updateBlogServices,
   deleteBlogServices,
   getBlogByIdServices
}
export default BlogServices;