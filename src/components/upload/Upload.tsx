
import { Checkbox, ConfigProvider, Radio } from 'antd';

export const Upload = () => {

   // const { handleSubmit, control } = useForm({
   //    defaultValues: {
   //       title: "batman"
   //    }
   // });

   return (
      <>
         <ConfigProvider
            theme={{
               components: {
                  Radio: {
                     colorPrimary: '#00b96b',
                  },
               },
            }}
         >
            <Radio >Radio</Radio>
            <Radio>Checkbox</Radio>
         </ConfigProvider>
      </>
   )
}
