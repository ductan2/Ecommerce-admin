import { Button } from "antd"
import { RootState, useAppDispatch } from "../../store/store"
import { uploadImage } from "../../features/uploads/uploadSlice"
import { useSelector } from "react-redux"
import { Loading } from "../loading/Loading"
import Dropzone, { FileWithPath } from 'react-dropzone'
export const Upload = () => {

   const dispatch = useAppDispatch()

   const { data, isLoading } = useSelector((state: RootState) => state.upload)
   console.log(data)
   if (isLoading) return <Loading isFull />
   
   return (
      <>
         <form action="">
            <Dropzone onDrop={(acceptedFiles: FileWithPath[]) => dispatch(uploadImage(acceptedFiles))}>
               {({ getRootProps, getInputProps }) => (
                  <section>
                     <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                     </div>
                  </section>
               )}
            </Dropzone>
            <br />
            <br />
            <Button className="btn btn-primary"><i className="text-muted material-icons md-post_add"></i>Add images</Button>
         </form >
         { }
      </>
   )
}
