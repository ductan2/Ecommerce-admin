

type props = {
   label: string
   placeholder: string
   type: string
}

export const InputProduct = ({ label, placeholder, type }: props) => {
   return (
      <div className="mb-4">
         <label className="form-label">{label}</label>
         <input placeholder={placeholder} type={type} className="form-control" />
      </div>
   )
}
