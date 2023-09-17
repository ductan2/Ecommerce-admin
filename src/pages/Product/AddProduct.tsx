import Dropzone from "react-dropzone"
import { RootState, useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"
import { Loading } from "../../components/loading/Loading"
import { uploadImage } from "../../features/uploads/uploadSlice"
import { ChangeEvent, useEffect, useState } from "react"
import { getAllBrand } from "../../features/brand/brandSlice"
import { getAllCategoryProduct } from "../../features/categoryProduct/categoryProcSlice"
import { Select, SelectProps } from "antd"
import { getColors } from "../../features/color/colorSlice"
import { SelectCustom } from "../../components/select/SelectCustom"
import { useForm } from "react-hook-form"
import { Product } from "../../types/apiType/product.type"
import { productSchema } from "../../utils/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputCustom } from "../../components/input/InputCustom"
import { TextArea } from "../../components/textarea/TextArea"
import { ConfigProvider, Radio } from 'antd';
import { Button } from "../../components/button/Button"
import { UploadImageType } from "../../types/CommonTpye"
import { createProduct } from "../../features/product/productSlice"
import swal from "sweetalert2"
export const AddProduct = () => {
   const [color, setColor] = useState<string[]>([])
   const [category, setCategory] = useState<string[]>([])
   const [brand, setBrand] = useState<string>()
   const [featured, setFeatured] = useState<boolean>(false)
   const [trending, setTrending] = useState<boolean>(false)
   const dispatch = useAppDispatch()


   const { handleSubmit, control, setValue, formState: { errors } } = useForm<Product>({
      mode: "onChange",
      resolver: yupResolver(productSchema),
      defaultValues: {
         title: "",
         description: "",
         slug: "",
         price: 0,
         quantity: 0,
         brand: "",
         category: [],
         images: [],
         trending: false,
         featured: false,
         sold: 0,
         rating_distribution: 5,
      }
   });
   console.log("🚀 ~ file: AddProduct.tsx:47 ~ AddProduct ~ errors:", errors)

   useEffect(() => {
      dispatch(getAllBrand())
      dispatch(getAllCategoryProduct())
      dispatch(getColors())
   }, [dispatch])

   const { data: imageData } = useSelector((state: RootState) => state.upload)
   const { data: categoryState, isLoading } = useSelector((state: RootState) => state.categoryProduct)
   const { data: brandData } = useSelector((state: RootState) => state.brand)
   const { data: colorState } = useSelector((state: RootState) => state.colors)




   const categoryData: SelectProps['options'] = [];
   categoryState.forEach((i) => {
      categoryData.push({
         value: i._id,
         label: i.title,
      });
   });

   const coloropt: SelectProps['options'] = [];
   colorState.forEach((i) => {
      coloropt.push({
         value: i._id,
         label: i.title,
      });
   });

   useEffect(() => {
      setValue("brand", brand as string)
   }, [brand, setValue])
   useEffect(() => {
      setValue("category", category)
   }, [category, setValue])
   useEffect(() => {
      setValue("color", color)
   }, [color, setValue])
   useEffect(() => {
      setValue("images", imageData as UploadImageType[])
   }, [imageData, setValue])


   const handleChange = (value: string[], option: string) => {
      if (option === "Colors") {
         setColor(value)
      }
      if (option === "Categorys") {
         setCategory(value)
      }

   };
   const onSubmit = handleSubmit((data) => {
      data.featured = featured
      data.trending = trending
      try {
         dispatch(createProduct(data))
         swal({
            title: 'Success!',
            text: "Color has been created.",
            type: 'success',
         }).then(() => {
            // window.location.reload()
         })
      } catch (error) {
         console.log("🚀 ~ file: AddProduct.tsx:91 ~ onSubmit ~ error:", error)
      }
   })

   if (isLoading) return <Loading isFull />


   return (
      <>
         <section className="content-main">
            <div className="row">
               <div className="col-9">
                  <div className="content-header">
                     <h2 className="content-title">Add New Product</h2>
                  </div>
               </div>
               <form action="" className="row" onSubmit={onSubmit}>
                  <div className="col-lg-6">
                     <div className="right-flex mb-15">
                        <Button className="btn btn-light rounded font-sm mr-5 text-body hover-up">Reset</Button>
                        <Button type="submit" className="btn btn-md rounded font-sm hover-up">Add product</Button>
                     </div>
                     <div className="card mb-4">
                        <div className="card-header">
                           <h4>Basic</h4>
                        </div>
                        <div className="card-body">
                           <InputCustom errorMessage={errors.title?.message} label="Title" control={control} type="text" placeholder="Enter name product" name="title" />
                           <InputCustom errorMessage={errors.slug?.message} label="Slug" control={control} type="text" placeholder="Enter slug" name="slug" />
                           <div className="row">
                              <div className="col-lg-6">
                                 <InputCustom errorMessage={errors.price?.message} label="Price" control={control} type="number" placeholder="Price" name="price" />
                              </div>
                              <div className="col-lg-6">
                                 <InputCustom errorMessage={errors.quantity?.message} label="quantity" control={control} type="number" placeholder="Quantity" name="quantity" />
                              </div>
                           </div>
                           <TextArea name="description" errorMessage={errors.description?.message} label="Description" control={control} placeholder="Enter desc..." />
                           <div className="row">
                              <div className="col-lg-6">
                                 <ConfigProvider
                                    theme={{
                                       components: {
                                          Radio: {
                                             colorPrimary: '#00b96b',
                                          },
                                       },
                                    }}
                                 >
                                    <Radio name="featured" checked={featured} value={featured} onClick={() => setFeatured(!featured)}>Features</Radio>
                                    <Radio name="trending" checked={trending} value={trending} onClick={() => setTrending(!trending)} >Trending </Radio>
                                 </ConfigProvider>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-3">
                     <div className="card mb-4">
                        <div className="card-header">
                           <h4>Upload</h4>
                        </div>
                        <div className="card-body">
                           <div className="input-upload">
                              <Dropzone
                                 onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
                              >
                                 {({ getRootProps, getInputProps }) => (
                                    <section className="cursor-pointer">
                                       <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>
                                             Drag 'n' drop some files here, or click to select files
                                          </p>
                                          <div className="list-image mt-15">
                                             {imageData && imageData.length > 0 ? imageData.map((image: UploadImageType) => (
                                                <div key={image.public_id}>
                                                   <img src={image.url} style={{ width: "100px", height: "100px", objectFit: "cover" }} className="object-cover" alt="" />
                                                </div>
                                             )) :
                                                (<img src="/img-upload.png" className="mt-15" alt="" />)
                                             }
                                          </div>
                                       </div>
                                    </section>
                                 )}

                              </Dropzone>

                           </div>
                        </div>
                     </div>
                     <div className="card mb-4">
                        <div className="card-header">
                           <h4>Others</h4>
                        </div>
                        <div className="card-body">
                           <div className="row gx-2">

                              <div className="col-sm-6 mb-3">
                                 <SelectCustom data={brandData} name="Brand" onChange={(e: ChangeEvent<HTMLSelectElement>) => setBrand(e.target.value)} />

                              </div>
                              <div className="mb-4">
                                 <label className="form-label">Colors</label>
                                 <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Colors"
                                    onChange={(i) => handleChange(i, "Colors")}
                                 >
                                    {coloropt.map((i) => (
                                       <Select.Option key={i.value} value={i.value}>{i.label}</Select.Option>
                                    ))}
                                 </Select>
                              </div>
                              <div className="mb-4">
                                 <label className="form-label">Categorys</label>
                                 <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Categorys"
                                    onChange={(i) => handleChange(i, "Categorys")}
                                    allowClear
                                 >
                                    {categoryData.map((i) => (
                                       <Select.Option key={i.value} value={i.value}>{i.label}</Select.Option>
                                    ))}
                                 </Select>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

               </form>
            </div>
         </section>
      </>
   )
}
