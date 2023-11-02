import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { createColor, deleteColor, getColorById, getColors, updateColor } from "../features/color/colorSlice"
import { Loading } from "../components/loading/Loading"
import { RootState, useAppDispatch } from "../store/store"
import { formatDate } from "../utils/util"
import { Heading } from "../components/heading/Heading"
import { Button } from "../components/button/Button"
import Swal from 'sweetalert2'
import { ActionDetails } from "../components/detailsAction/ActionDetails"
import { useForm } from "react-hook-form";
import { Color } from "../types/apiType/color.type"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaWithTitle } from "../utils/validation"
import { ModalCustomTitle } from "../components/modal/ModalCustomTitle"
import { InputCustom } from "../components/input/InputCustom"

export const Colors = () => {

   const dispatch = useAppDispatch()
   const [colors, setColors] = useState<Color[]>([])
   const [isItem, setIsItem] = useState<string>("")
   const [modalIsOpen, setIsOpen] = useState<boolean>(false);
   useEffect(() => {
      dispatch(getColors())
   }, [dispatch])
   const { handleSubmit, control, reset } = useForm<Color>({
      mode: "onChange",
      resolver: yupResolver(schemaWithTitle("color")),
      defaultValues: {
         title: ""
      }
   });
   const { data, isLoading, dataUpdate } = useSelector((state: RootState) => state.colors)
   const onSubmit = handleSubmit((data) => {
      try {
         dispatch(createColor(data.title))
         Swal({
            title: 'Success!',
            text: "Color has been created.",
            type: 'success',
         }).then(() => {
            dispatch(getColors())
         })

      } catch (error) {
         console.log(error)
      }
   })
   const handleDelete = (id: string): void => {
      try {
         dispatch(deleteColor(id))
         Swal({
            title: 'Success!',
            text: "Color has been deleted.",
            type: 'success',
         }).then(() => {
            dispatch(getColors())
         })
      } catch (error) {
         console.log(error)
      }
   }

   const handleUpdateColor = (id: string) => handleSubmit((data) => {
      try {
         dispatch(updateColor({ id, title: data.title }));
         Swal({
            title: 'Success!',
            text: "Color has been deleted.",
            type: 'success',
         }).then(() => {
            setIsOpen(false)
            dispatch(getColors())
         })
      } catch (error) {
         console.log(error)
      }
   })


   useEffect(() => {
      setColors(data)
   }, [data])
   const openModal = async (id: string) => {
      setIsItem(id);
      await dispatch(getColorById(id)); // Chờ cho dữ liệu được tải xong
      setIsOpen(true);
   }
   useEffect(() => {
      if (dataUpdate) {
         reset(dataUpdate); // Reset dữ liệu form khi dataUpdate thay đổi
      }
   }, [dataUpdate, reset]);


   if (isLoading) return <Loading isFull />
   return (

      <>

         <section className="content-main">

            <Heading title="Colors" slogan="Add, edit or delete a color" />

            <div className="card">
               <div className="card-body">
                  <div className="row">
                     <div className="col-md-3">
                        <form onSubmit={onSubmit}>
                           <InputCustom label="Color" control={control} type="text" placeholder="Color" name="title" />
                           <div className="d-grid">
                              <Button className="btn btn-primary">
                                 Create color
                              </Button>
                           </div>
                        </form>
                     </div>
                     <div className="col-md-9">
                        <div className="table-responsive">
                           <table className="table table-hover">
                              <thead>
                                 <tr>
                                    <th className="text-center">
                                       <div className="form-check">
                                          <input className="form-check-input" type="checkbox" value="" />
                                       </div>
                                    </th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                    <th className="text-end">Action</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {colors.map((item, index) => (
                                    <tr key={item._id || index}>
                                       <td className="text-center">
                                          <div className="form-check">
                                             <input className="form-check-input" type="checkbox" value="" />
                                          </div>
                                       </td>
                                       <td>{item._id}</td>
                                       <td><b>{item.title}</b></td>
                                       <td><span className="color-product" style={{ backgroundColor: item.title }}></span></td>
                                       <td>{formatDate(item.created_at as string)}</td>
                                       <td>{formatDate(item.updated_at as string)}</td>

                                       <ActionDetails _id={item._id} handleDelete={handleDelete} openModal={() => openModal(item._id as string)} />
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <ModalCustomTitle control={control}
            functionSubmit={handleUpdateColor(isItem)}
            title="Update color" name="title"
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen} placeholder="Colors" />
      </>

   )
}
