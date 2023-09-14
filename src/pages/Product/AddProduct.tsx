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
import { InputProduct } from "../../components/input/InputProduct"
// import { Select } from "../../components/select/Select"

export const AddProduct = () => {
   const [color, setColor] = useState<string[]>([])
   const [category, setCategory] = useState<string[]>([])
   const [brand, setBrand] = useState<string>()

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getAllBrand())
      dispatch(getAllCategoryProduct())
      dispatch(getColors())
   }, [dispatch])


   const { data: imageData } = useSelector((state: RootState) => state.upload)
   const { data: categoryState, isLoading } = useSelector((state: RootState) => state.categoryProduct)
   const { data: brandData } = useSelector((state: RootState) => state.brand)
   const { data: colorState } = useSelector((state: RootState) => state.colors)


   if (isLoading) return <Loading isFull />


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

   const handleChange = (value: string[], option: string) => {
      if (option === "Colors") {
         setColor(value)
      }
      if (option === "Categorys") {
         setCategory(value)
      }

   };
   console.log("colors", color)
   console.log("category", category)
   console.log("brand", brand)



   return (
      <>
         <section className="content-main">
            {color.map((i) => (
               <p key={i}>{i} </p>
            ))
            }{color.length}
            <div className="row">
               <div className="col-9">
                  <div className="content-header">
                     <h2 className="content-title">Add New Product</h2>

                  </div>
               </div>
               <form action="" className="row">
                  <div className="col-lg-6">
                     <div className="card mb-4">
                        <div className="card-header">
                           <h4>Basic</h4>
                        </div>
                        <div className="card-body">
                           <InputProduct label="Name" placeholder="Name product" type="text" />
                           <div className="row">
                              <div className="col-lg-6">
                                 <div className="mb-4">
                                    <label className="form-label">Regular price</label>
                                    <div className="row gx-2">
                                       <input placeholder="$" type="text" className="form-control" />
                                    </div>
                                 </div>
                              </div>
                              <div className="col-lg-6">
                                 <div className="mb-4">
                                    <label className="form-label">Promotional price</label>
                                    <input placeholder="$" type="text" className="form-control" />
                                 </div>
                              </div>
                           </div>
                           <div className="mb-4">
                              <label className="form-label">Full description</label>
                              <textarea placeholder="Type here" className="form-control" rows={4}></textarea>
                           </div>
                           <div className="row">
                              <div className="col-lg-4">
                                 <div className="mb-4">
                                    <label className="form-label">Regular price</label>
                                    <div className="row gx-2">
                                       <input placeholder="$" type="text" className="form-control" />
                                    </div>
                                 </div>
                              </div>
                              <div className="col-lg-4">
                                 <div className="mb-4">
                                    <label className="form-label">Promotional price</label>
                                    <input placeholder="$" type="text" className="form-control" />
                                 </div>
                              </div>
                              <div className="col-lg-4">
                                 <label className="form-label">Currency</label>
                                 <select className="form-select">
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>RUBL</option>
                                 </select>
                              </div>
                           </div>
                           <div className="mb-4">
                              <label className="form-label">Tax rate</label>
                              <input type="text" placeholder="%" className="form-control" id="product_name" />
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
                                             {imageData && imageData.length > 0 ? imageData.map((image) => (
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
                  <div>
                     <button className="btn btn-light rounded font-sm mr-5 text-body hover-up">Reset</button>
                     <button className="btn btn-md rounded font-sm hover-up">Add product</button>
                  </div>
               </form>
            </div>
         </section>
      </>
   )
}
