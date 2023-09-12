import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { createColor, deleteColor, getColors, updateColor } from "../features/color/colorSlice"
import { Loading } from "../components/loading/Loading"
import { RootState, useAppDispatch } from "../store/store"
import { formatDate } from "../utils/util"
import { Heading } from "../components/heading/Heading"
import { Button } from "../components/button/Button"
import Swal from 'sweetalert2'
import { ActionDetails } from "../components/detailsAction/ActionDetails"
import { useForm } from "react-hook-form";
import { Color } from "../types/apiType/color.type"
import { Input } from "../components/input/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaWithTitle } from "../utils/validation"
import { ModalCustomTitle } from "../components/modal/ModalCustomTitle"

export const Colors = () => {

   const dispatch = useAppDispatch()
   const [colors, setColors] = useState<Color[]>([])
   const [modalIsOpen, setIsOpen] = useState<boolean>(false);
   useEffect(() => {
      dispatch(getColors())
   }, [dispatch])
   const { handleSubmit, control } = useForm<Color>({
      mode: "onChange",
      resolver: yupResolver(schemaWithTitle("color")),
      defaultValues: {
         title: ""
      }
   });
   const { data, isLoading } = useSelector((state: RootState) => state.colors)

   const onSubmit = handleSubmit((data) => {

      try {
         // console.log(data.title)
         dispatch(createColor(data.title))
         Swal({
            title: 'Success!',
            text: "Color has been created.",
            type: 'success',
         }).then(() => {

            window.location.reload()
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
            window.location.reload()
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
            window.location.reload()
         })
      } catch (error) {
         console.log(error)
      }
   })



   useEffect(() => {
      setColors(data)
   }, [data])

   if (isLoading) return <Loading isFull />


   return (

      <>
         <section className="content-main">

            <Heading title="Colors" slogan="Add, edit or delete a color" isSearch placeholder="Search colors" />

            <div className="card">
               <div className="card-body">
                  <div className="row">
                     <div className="col-md-3">
                        <form onSubmit={onSubmit}>
                           <div className="mb-4">
                              <label htmlFor="product_name" className="form-label">Name</label>
                              <Input control={control} type="text" placeholder="Color" name="title" id="product_name" />
                           </div>
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

                                       <ActionDetails _id={item._id} handleDelete={handleDelete} setIsOpen={setIsOpen} />
                                       <ModalCustomTitle control={control}
                                          functionSubmit={handleUpdateColor(item._id as string)}
                                          title="Update color" name="title"
                                          modalIsOpen={modalIsOpen}
                                          setIsOpen={setIsOpen} placeholder="Colors"/>
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

      </>

   )
}
