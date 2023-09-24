import ReactQuill from "react-quill"
import { useEffect, useState, useMemo } from "react"
import { Heading } from "../../components/heading/Heading"
import 'react-quill/dist/quill.snow.css';
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getAllBlogCategory } from "../../features/blogCategory/blogCategorySlice";
import { Select } from "antd";
import { Loading } from "../../components/loading/Loading";
import { useForm, Controller } from "react-hook-form";
import { Blog } from "../../types/apiType/blog.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaBlog } from "../../utils/validation";
import { InputCustom } from "../../components/input/InputCustom";
import { createBlog, getBlogById, resetState, updateBlog } from "../../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { deleteImage, uploadImage } from "../../features/uploads/uploadSlice";
import { UploadImageType } from "../../types/CommonTpye";
import ImageUpload from "../../components/upload/ImageUpload";
import swal from "sweetalert2";
export const AddBlogCategory = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate();
   const [cateblog, setCateblog] = useState<string[]>([])
   const { id: idBlog } = useParams<{ id: string }>()
   const [imageBlog, setImageBlog] = useState<UploadImageType>(undefined!)
   const { handleSubmit, getValues, setValue, control, reset, formState: { errors } } = useForm<Blog>({
      mode: "onChange",
      resolver: yupResolver(schemaBlog),
      defaultValues: {
         title: "",
         description: "",
         category: [],
      }
   })
   const { data: CateBlogData, isLoading } = useSelector((state: RootState) => state.blogCategory)
   const { data: dataUpload, isLoading: isLoadingImage } = useSelector((state: RootState) => state.upload)
   const { dataUpdate } = useSelector((state: RootState) => state.blog)
   useEffect(() => {
      dispatch(getAllBlogCategory())
   }, [dispatch])
   useEffect(() => {
      if (idBlog) {
         dispatch(getBlogById(idBlog))
      }
      else {
         setTimeout(() => {
            dispatch(resetState())
            reset({
               title: "",
               description: "",
               category: [],
            })
            setCateblog([])
            setImageBlog(undefined!)
         }, 100)
      }
   }, [idBlog, reset, dispatch])
   useEffect(() => {
      setCateblog(dataUpdate?.category as string[])
      setImageBlog(dataUpdate?.images as UploadImageType)
      reset(dataUpdate)
   }, [reset, dataUpdate])
   useEffect(() => {
      setValue("category", cateblog)
   }, [setValue, cateblog, getValues])
   useEffect(() => {
      if (dataUpload) {
         setImageBlog(dataUpload[0])
      }
   }, [dataUpload])

   const categoryBlogData = useMemo(() => {
      return CateBlogData.map((i) => ({
         value: i._id,
         label: i.title,
      }));
   }, [CateBlogData]);

   const handleChange = (value: string[]) => {
      setCateblog(value)
   };
   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(uploadImage(e.target.files![0]))
   }
   const handleDeleteImage = (publicId: string) => {
      dispatch(deleteImage(publicId))
      setImageBlog(undefined!)
   }
   const onSubmit = handleSubmit((data) => {
      if (idBlog !== undefined) {
         if (dataUpload[0]) {
            data.images = dataUpload[0] as UploadImageType
         }
         dispatch(updateBlog({ id: idBlog, data }))
         swal({
            title: 'Success!',
            text: "Blog has been created.",
            type: 'success',
         })
         dispatch(resetState());
         navigate("/admin/blogs/list")
         window.location.reload()
      } else {
         data.images = dataUpload[0] as UploadImageType
         dispatch(createBlog(data));
         setImageBlog(undefined!)
         reset();
         setCateblog([])
         setTimeout(() => {
            dispatch(resetState());
            swal({
               title: 'Success!',
               text: "Blog has been created.",
               type: 'success',
            })
         }, 300);

      }
   });

   if (isLoading) return <Loading isFull />
   return (
      <>
         <section className="content-main">
            <div className="row">
               <div className="col-6">
                  <Heading title={idBlog ? "Edit blog" : "Add new blog"} />
               </div>
            </div>
            <form action="" onSubmit={onSubmit}>
               <div className="row">
                  <div className="col-lg-8">
                     <div className="card mb-4">
                        <div className="card-body">
                           <div className="row">
                              <div >
                                 <InputCustom label="Title" control={control} type="text" placeholder="Enter Title" name="title" errorMessage={errors.title?.message} />

                                 <hr className="mb-4 mt-0" />

                                 <div className="mb-4">
                                    <label className="form-label">Brand name</label>
                                    <Select
                                       mode="tags"
                                       style={{ width: '100%' }}
                                       placeholder="Categorys"
                                       onChange={(i) => handleChange(i)}
                                       allowClear
                                       value={cateblog}
                                    >
                                       {categoryBlogData.map((i) => (
                                          <Select.Option key={i.value} value={i.value}>{i.label}</Select.Option>
                                       ))}
                                    </Select>
                                    {errors.category && <span className="text-danger">{errors.category.message}</span>}
                                 </div>
                                 <hr className="mb-4 mt-0" />
                                 <div className="mb-4">
                                    <label className="form-label">Description</label>
                                    <Controller
                                       name="description"
                                       control={control}
                                       defaultValue=""
                                       render={({ field }) => (
                                          <ReactQuill
                                             theme="snow"
                                             className="mt-3"
                                             {...field}
                                             onChange={(value) => field.onChange(value)}
                                             value={field.value}
                                          />
                                       )}
                                    />
                                    {errors.description && <span className="text-danger">{errors.description.message}</span>}
                                 </div>
                              </div>
                           </div>

                           <hr className="mb-4 mt-0" />
                           <div className="row">
                              <div>
                                 <div className="mb-4">
                                    <label className="form-label">Images</label>
                                    <input className="form-control" name="images" type="file" onChange={(e) => handleUpload(e)} />
                                    {imageBlog || isLoadingImage ? <ImageUpload
                                       isLoadingImage={isLoadingImage} image={imageBlog?.url}
                                       handleDeleteImage={() => handleDeleteImage(imageBlog?.public_id as string)}
                                       className="image-upload" /> : <ImageUpload />}
                                 </div>
                              </div>
                           </div>
                           <hr className="mb-4 mt-0" />

                           <div>
                              <Button className="btn btn-light rounded font-sm mr-5 text-body hover-up">Save to draft</Button>
                              <Button type="submit" className="btn btn-md rounded font-sm hover-up">Publich</Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </section>
      </>
   )
}
