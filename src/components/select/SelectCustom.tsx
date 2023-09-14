

type props<T> = {
   data: T[]
   name: string
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectCustom = <T extends { _id?: string; title: string }>({ data, name,onChange }: props<T>) => {
   return (
      <>
         <label className="form-label">{name}</label>
         <select className="form-select" onChange={onChange}>
            {data && data.length > 0 && data.map((item) => (
               <option  value={item._id} key={item._id}>{item.title}</option>
            ))}
         </select>
      </>
   )
}
