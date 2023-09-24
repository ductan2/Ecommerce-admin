import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import { Loading } from "../../components/loading/Loading"
import { useEffect, useState, Fragment } from "react"
import { createBrand, deleteBrand, getABrand, getAllBrand, updateBrand } from "../../features/brand/brandSlice"
import { Button } from "../../components/button/Button"
import { ModalCustomTitle } from "../../components/modal/ModalCustomTitle"
import { yupResolver } from "@hookform/resolvers/yup"
import { Brand } from "../../types/apiType/brand.type"
import { useForm } from "react-hook-form";
import { schemaBrand } from "../../utils/validation"
import Swal from 'sweetalert2'
import { deleteImage, uploadImage } from "../../features/uploads/uploadSlice"
import ImageUpload from "../../components/upload/ImageUpload"
import { UploadImageType } from "../../types/CommonTpye"
import { MdModeEditOutline, MdDelete } from 'react-icons/md'


export const Brands = () => {
   const [modalIsOpen, setIsOpen] = useState<boolean>(false);

   const [task, setTask] = useState("Create");
   const dispatch = useAppDispatch()
   const { handleSubmit, control, reset, formState: { errors } } = useForm<Brand>({
      mode: "onChange",
      resolver: yupResolver(schemaBrand),
      defaultValues: {
         title: "",
         images: {},
      },
   });

   useEffect(() => {
      dispatch(getAllBrand())
   }, [dispatch])
   const { data, isLoading, dataUpdate } = useSelector((state: RootState) => state.brand)
   const openModal = async (id: string) => {
      await dispatch(getABrand(id));
      setTask("Edit");
      setIsOpen(true);
   }
   const handleCreate = () => {
      setTask("Create");
      setIsOpen(true);
   }
   useEffect(() => {
      if (dataUpdate) {
         reset(dataUpdate); // Reset dữ liệu form khi dataUpdate thay đổi
      }
   }, [dataUpdate, reset]);
   const { data: dataUpload, isLoading: isLoadingImage } = useSelector((state: RootState) => state.upload)
   if (isLoading) return <Loading isFull />
   const onSubmit = handleSubmit((data) => {
      console.log(dataUpload)
      data.images = dataUpload[0] as UploadImageType
      try {
         dispatch(createBrand({ title: data.title, images: data.images }))
         Swal({
            title: 'Success!',
            text: "Brand has been created.",
            type: 'success',
         }).then(() => {
            setIsOpen(false)
            window.location.reload()
         })
      } catch (error) {
         console.log("errors:", error)
      }
   })
   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(uploadImage(e.target.files![0]))
   }
   const handleDelete = (id: string, id_image: string) => {
      const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
      if (userConfirmed) {
         dispatch(deleteBrand(id))
         dispatch(deleteImage(id_image))
         Swal({
            title: 'Success!',
            text: "Brand has been deleted.",
            type: 'success',
         }).then(() => {
            window.location.reload()
         })
      }
   }
   const onEditSumit = (id: string) => handleSubmit((data) => {
      try {
         dispatch(updateBrand({ id, title: data.title, images: dataUpload[0] as UploadImageType }))
         Swal({
            title: 'Success!',
            text: "Brand has been edit.",
            type: 'success',
         }).then(() => {
            setIsOpen(false)
            window.location.reload()
         })
      } catch (error) {
         console.log("errors:", error)
      }
   })

   return (
      <>
         <section className="content-main">
            <div className="content-header">
               <div>
                  <h2 className="content-title card-title">Brand</h2>
                  <p>Brand and vendor management</p>
               </div>
               <div onClick={() => handleCreate()}>
                  <Button className="btn btn-primary"><i className="text-muted material-icons md-post_add"></i>Add New Brand</Button>
               </div>
            </div>
            <div className="card mb-4">
               <header className="card-header">
                  <div className="row gx-3">
                     <div className="col-lg-4 mb-lg-0 mb-15 me-auto">
                        <input type="text" placeholder="Search brand..." className="form-control" />
                     </div>
                  </div>
               </header>
               <div className="card-body">
                  <div className="row gx-3">
                     {data.map((item, index) => {
                        return <Fragment key={item._id}>
                           <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                              <figure className="card border-1 cursor-pointer">
                                 <div className="card-header bg-white text-center" style={{ height: "150px" }}>
                                    {typeof item.images === "string" ? <img height="76" src={item.images} className="img-fluid" style={{ height: "70px" }} alt="Logo" /> :
                                       <img height="76" src={item.images?.url} className="img-fluid" style={{ height: "100%", maxHeight: "100px" }} alt="Logo" />}
                                 </div>
                                 <figcaption className="card-body text-center">
                                    <h6 className="card-title m-0">{item.title}</h6>
                                    <a href="#"> {item.quantity} items </a>
                                 </figcaption>
                                 <div className="card-footer">
                                    <div>
                                       <button value={index} className="btn btn-edit rounded font-sm hover-up" onClick={() => openModal(item._id as string)} >
                                          <MdModeEditOutline />
                                       </button>
                                    </div>
                                    <div>
                                       <button className="btn btn-delete rounded font-sm hover-up" onClick={() => handleDelete(item._id as string, item.images?.public_id as string)}>
                                          <MdDelete />
                                       </button>
                                    </div>
                                 </div>
                              </figure>
                           </div>

                        </Fragment>

                     })}
                  </div>
               </div>
            </div>
         </section>


         {task === "Create" ? (
            // Hiển thị nội dung cho chế độ "Create"
            <>
               <ModalCustomTitle control={control}
                  functionSubmit={onSubmit}
                  title="Create brand" name="title"
                  modalIsOpen={modalIsOpen}
                  errorMessage={errors.title?.message}
                  setIsOpen={setIsOpen} placeholder="Brand">
                  <div className="mt-5">
                     <label htmlFor="product_name" className="form-label">Image</label>
                     <div className="relative undefined">
                        <input
                           type="file" name="image-brand"
                           onChange={(e) => handleUpload(e)} className="form-control" />
                     </div>
                     {dataUpload ? <ImageUpload isLoadingImage={isLoadingImage} image={dataUpload[0]?.url} handleDeleteImage={() => dispatch(deleteImage(dataUpload[0].public_id!))} /> : <ImageUpload />}
                  </div>
               </ModalCustomTitle>
            </>
         ) : (

            <>
               <ModalCustomTitle control={control}
                  functionSubmit={onEditSumit(dataUpdate?._id as string)}
                  title="Edit brand" name="title"
                  modalIsOpen={modalIsOpen}
                  errorMessage={errors.title?.message}
                  setIsOpen={setIsOpen} placeholder="Brand">
                  <div className="mt-5">
                     <label htmlFor="product_name" className="form-label">Image</label>
                     <div className="relative">
                        <input
                           type="file" name="image-brand"
                           onChange={(e) => handleUpload(e)} className="form-control" />
                     </div>
                     {dataUpdate && dataUpload ? <ImageUpload isLoadingImage={isLoadingImage} image={dataUpload[0]?.url || dataUpdate?.images?.url} handleDeleteImage={() => dispatch(deleteImage(dataUpdate?.images?.public_id || dataUpload[0].public_id!))} /> : <ImageUpload />}
                  </div>
               </ModalCustomTitle>
            </>
         )}

         {/* create  */}


         {/* edit  */}

      </>
   )
}
