import { useState } from "react"

export const Search = () => {
   const [valueSearch, setValueSearch] = useState('')
   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueSearch(e.target.value)
   }

   return (
      <div className="input-group" >
         <input list="search_terms" value={valueSearch} type="text" className="form-control" placeholder="Search term" onChange={handleChangeValue} />
         <button className="btn btn-light bg" type="button"><i className="material-icons md-search"></i></button>
      </div>
   )
}
