import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "antd";
import Dropzone from "react-dropzone"; 
import slugify from "slugify";
import { RootState, useAppDispatch } from "../../store/store";

import { Loading } from "../../components/loading/Loading";
import { Product } from "../../types/apiType/product.type";
import { productSchema } from "../../utils/validation";
import { InputCustom } from "../../components/input/InputCustom";
import { TextArea } from "../../components/textarea/TextArea";
import { ConfigProvider, Radio } from "antd";
import { Button } from "../../components/button/Button";
import { UploadImageType } from "../../types/CommonTpye";
import { SelectCustom } from "../../components/select/SelectCustom";
import ImageUpload from "../../components/upload/ImageUpload";
import { useParams } from "react-router-dom";
import { deleteImage, uploadImage } from "../../features/uploads/uploadSlice";
import { createProduct, getProductById, updateProduct } from "../../features/product/productSlice";
import { getAllBrand } from "../../features/brand/brandSlice";
import { getAllCategoryProduct } from "../../features/categoryProduct/categoryProcSlice";
import { getColors } from "../../features/color/colorSlice";
import { Heading } from "../../components/heading/Heading";

export const ProductForm = () => {
   const { id } = useParams<{ id: string }>();
   const [color, setColor] = useState<string[]>([]);
   const [category, setCategory] = useState<string[]>([]);
   const [brand, setBrand] = useState<string | undefined>("");
   const [featured, setFeatured] = useState<boolean>(false);
   const [trending, setTrending] = useState<boolean>(false);
   const [image, setImage] = useState<UploadImageType[]>([]);
   const dispatch = useAppDispatch();

   const {
      handleSubmit,
      reset,
      control,
      setValue,
      formState: { errors },
   } = useForm<Product>({
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
      },
   });

   useEffect(() => {
      dispatch(getAllBrand());
      dispatch(getAllCategoryProduct());
      dispatch(getColors());
   }, [dispatch]);

   useEffect(() => {
      if (id) {
         dispatch(getProductById(id));
      } else {
         setTimeout(() => {
            reset({
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
            });
            setBrand("");
            setCategory([]);
            setColor([]);
            setFeatured(false);
            setTrending(false);
            setImage([]);
         }, 100);
      }
   }, [dispatch, id, reset]);

   const { data: imageData, isLoading: loadingImage } = useSelector(
      (state: RootState) => state.upload
   );
   const { data: categoryState } = useSelector(
      (state: RootState) => state.categoryProduct
   );
   const { data: brandData } = useSelector((state: RootState) => state.brand);
   const { data: colorState } = useSelector((state: RootState) => state.colors);
   const { dataUpdate, isLoading } = useSelector(
      (state: RootState) => state.products
   );

   const categoryData = useMemo(() => {
      return categoryState.map((i) => ({
         value: i._id as string,
         label: i.title as string,
      }));
   }, [categoryState]);

   const coloropt = useMemo(() => {
      return colorState.map((i) => ({
         value: i._id as string,
         label: i.title as string,
      }));
   }, [colorState]);

   useEffect(() => {
      const value = brandData?.find((i) => i.title === brand);
      setValue("brand", value?._id as string);
   }, [brand, setValue, brandData]);

   useEffect(() => {
      setValue("category", category);
   }, [category, setValue]);

   useEffect(() => {
      setValue("color", color);
   }, [color, setValue]);

   useEffect(() => {
      setImage([...image, ...imageData]);
      setValue("images", imageData as UploadImageType[]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [imageData, setValue]);

   const handleChange = (value: string[], option: string) => {
      if (option === "Colors") {
         setColor(value);
      }
      if (option === "Categorys") {
         setCategory(value);
      }
   };

   const handleDeleteImage = (public_id: string) => {
      dispatch(deleteImage(public_id as string));
      const filterImage = image.filter((i) => i.public_id !== public_id);
      setImage(filterImage);
   };

   useEffect(() => {
      if (dataUpdate && Array.isArray(dataUpdate)) {
         setBrand(dataUpdate[0].brand);
         setCategory(dataUpdate[0].category.map((i: { _id: string }) => i._id));
         setColor(dataUpdate[0].color.map((i: { _id: string }) => i._id));
         setFeatured(dataUpdate[0].featured || false);
         setTrending(dataUpdate[0].trending || false);
         setImage(dataUpdate[0].images);
         reset(...dataUpdate);
      }
   }, [dataUpdate, reset]);

   const onSubmit = handleSubmit((data) => {
      data.featured = featured;
      data.trending = trending;
      data.slug = slugify(data.title, { lower: true });

      try {
         if (id) {
            dispatch(updateProduct({ data, id }))
         } else {
            dispatch(createProduct(data));
         }

      } catch (error) {
         console.log("Error:", error);
      }
   });

   if (isLoading && !Array.isArray(dataUpdate)) return <Loading isFull />;


   return (
      <>
         <section className="content-main">
            <div className="row">
               <div className="col-9">
                  <Heading title={id ? "Edit Product" : "Add New Product"} />
               </div>
               <form action="" onSubmit={onSubmit} className="row">
                  <div className="col-lg-6">
                     <div className="right-flex mb-15">
                        <Button
                           className="btn btn-light rounded font-sm mr-5 text-body hover-up"
                           onClick={() => reset()}
                        >
                           Reset
                        </Button>
                        <Button
                           type="submit"
                           className="btn btn-md rounded font-sm hover-up"
                        >
                           {id ? "Edit Product" : "Add Product"}
                        </Button>
                     </div>
                     <div className="card mb-4">
                        <div className="card-header">
                           <h4>Product</h4>
                        </div>
                        <div className="card-body">
                           <InputCustom
                              errorMessage={errors.title?.message}
                              label="Title"
                              control={control}
                              type="text"
                              placeholder="Enter name product"
                              name="title"
                           />

                           <div className="row">
                              <div className="col-lg-6">
                                 <InputCustom
                                    errorMessage={errors.price?.message}
                                    label="Price"
                                    control={control}
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                 />
                              </div>
                              <div className="col-lg-6">
                                 <InputCustom
                                    errorMessage={errors.quantity?.message}
                                    label="quantity"
                                    control={control}
                                    type="number"
                                    placeholder="Quantity"
                                    name="quantity"
                                 />
                              </div>
                           </div>
                           <TextArea
                              name="description"
                              errorMessage={errors.description?.message}
                              label="Description"
                              control={control}
                              placeholder="Enter desc..."
                           />
                           <div className="row">
                              <div className="col-lg-6">
                                 <ConfigProvider
                                    theme={{
                                       components: {
                                          Radio: {
                                             colorPrimary: "#00b96b",
                                          },
                                       },
                                    }}
                                 >
                                    <Radio
                                       name="featured"
                                       checked={featured}
                                       value={featured}
                                       onClick={() => setFeatured(!featured)}
                                    >
                                       Features
                                    </Radio>
                                    <Radio
                                       name="trending"
                                       checked={trending}
                                       value={trending}
                                       onClick={() => setTrending(!trending)}
                                    >
                                       Trending
                                    </Radio>
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
                              <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
                                 {({ getRootProps, getInputProps }) => (
                                    <section className="cursor-pointer">
                                       <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>Drag 'n' drop some files here, or click to select files</p>
                                          <div className="list-image mt-15">
                                             {image.length === 0 ? (
                                                loadingImage ? (
                                                   <Loading isFull />
                                                ) : (
                                                   <img src="/img-upload.png" className="mt-15" alt="" />
                                                )
                                             ) : (
                                                image.map((item: UploadImageType) => (
                                                   <ImageUpload
                                                      key={item.public_id}
                                                      image={item.url}
                                                      isLoadingImage={loadingImage}
                                                      handleDeleteImage={() => handleDeleteImage(item.public_id as string)}
                                                   />
                                                ))
                                             )}
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
                              <div className="col-sm-12 mb-3">
                                 <SelectCustom
                                    defaulTitle="All brands"
                                    value={brand}
                                    data={brandData}
                                    name="Brand"
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                       setBrand(e.target.value)
                                    }
                                 />
                              </div>
                              <div className="mb-4">
                                 <label className="form-label">Colors</label>
                                 <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Colors"
                                    value={color}
                                    onChange={(i) => handleChange(i as string[], "Colors")}
                                    allowClear
                                 >
                                    {coloropt.map((i) => (
                                       <Select.Option key={i.value} value={i.value}>
                                          {i.label}
                                       </Select.Option>
                                    ))}
                                 </Select>
                              </div>
                              <div className="mb-4">
                                 <label className="form-label">Categorys</label>
                                 <Select
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    value={category}
                                    placeholder="Categorys"
                                    onChange={(i) => handleChange(i as string[], "Categorys")}
                                    allowClear
                                 >
                                    {categoryData.map((i) => (
                                       <Select.Option key={i.value} value={i.value}>
                                          {i.label}
                                       </Select.Option>
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
   );
};
