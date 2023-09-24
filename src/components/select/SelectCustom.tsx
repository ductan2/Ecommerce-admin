

type props<T> = {
   data: T[]
   name?: string
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   value?: string
   defaulTitle?: string
}

export const SelectCustom = <T extends { _id?: string; title: string }>({ data, name, onChange, value, defaulTitle }: props<T>) => {
   return (
      <>
         {name && <label className="form-label">{name}</label>}
         <select className="form-select" value={value} onChange={onChange}>
            <option value="All" key={"All"}>{defaulTitle}</option>
            {data && data.length > 0 && data.map((item) => (
               <option value={item.title} key={item._id}>{item.title}</option>
            ))}
         </select>
      </>
   )
}
