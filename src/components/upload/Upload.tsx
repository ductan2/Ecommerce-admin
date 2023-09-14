import { useForm } from "react-hook-form";
import { InputProduct } from "../input/InputProduct";
export const Upload = () => {

   const { handleSubmit, control } = useForm({
      defaultValues: {
         title: "batman"
      }
   });

   return (
      <>
         <form action="">
            <InputProduct label="title" placeholder="title" type="text" />
         </form >
         { }
      </>
   )
}
