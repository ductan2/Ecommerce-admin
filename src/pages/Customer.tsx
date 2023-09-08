
import { useSelector } from "react-redux"

import { useEffect } from "react"
import { getUsers } from "../features/customer/customerSlice"

import { Loading } from "../components/loading/Loading"
import { formatDate } from "../utils/util"
import { Link } from "react-router-dom"
import { RootState, useAppDispatch } from "../store/store"

export const Customer = () => {

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getUsers())
   }, [dispatch])
   const { data, isLoading } = useSelector((state: RootState) => state.customer)
   if (isLoading) return <><Loading isFull /></>
   return (
      <section className="content-main">
         <div className="content-header">
            <h2 className="content-title">Customer list</h2>
            <div>
               <a href="#" className="btn btn-primary"><i className="material-icons md-plus"></i> Create new</a>
            </div>
         </div>
         <div className="card mb-4">
            <header className="card-header">
               <div className="row gx-3">
                  <div className="col-lg-4 col-md-6 me-auto">
                     <input type="text" placeholder="Search..." className="form-control" />
                  </div>
                  <div className="col-lg-2 col-md-3 col-6">
                     <select className="form-select">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Show all</option>
                     </select>
                  </div>

               </div>
            </header>

            <div className="card-body">
               <div className="table-responsive">
                  <table className="table table-hover">
                     <thead>
                        <tr>
                           <th>Customer</th>
                           <th>Phone</th>
                           <th>Email</th>
                           <th>Block</th>
                           <th>Registered</th>
                           <th className="text-end">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((user) => (
                           <tr key={user._id}>
                              <td >
                                 <a href="#" className="itemside">
                                    <div className="left">
                                       <img src={user.avatar || "https://anubis.gr/wp-content/uploads/2018/03/no-avatar.png"} className="img-sm img-avatar" alt="Userpic" />
                                    </div>
                                    <div className="info pl-3">
                                       <h6 className="mb-0 title">{user.firstname + " " + user.lastname}</h6>
                                       <small className="text-muted">ID:{user._id}</small>
                                    </div>
                                 </a>
                              </td>
                              <td>{user.mobile}</td>
                              <td>{user.email}</td>
                              {
                                 user.blocked !== true ? <td><span className={`badge rounded-pill alert-success`}>Active</span></td> :
                                    <td><span className="badge rounded-pill alert-danger">Inactive</span></td>
                              }

                              <td>{formatDate((user.created_at!).toString())}</td>
                              <td className="text-end">
                                 <Link to={`/admin/customer/${user._id}`} className="btn btn-sm btn-brand rounded font-sm">View details</Link>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

               </div>
            </div>
         </div>
         <div className="pagination-area mt-15 mb-50">
            <nav aria-label="Page navigation example">
               <ul className="pagination justify-content-start">
                  <li className="page-item active"><a className="page-link" href="#">01</a></li>
                  <li className="page-item"><a className="page-link" href="#">02</a></li>
                  <li className="page-item"><a className="page-link" href="#">03</a></li>
                  <li className="page-item"><a className="page-link dot" href="#">...</a></li>
                  <li className="page-item"><a className="page-link" href="#">16</a></li>
                  <li className="page-item">
                     <a className="page-link" href="#"><i className="material-icons md-chevron_right"></i></a>
                  </li>
               </ul>
            </nav>
         </div>
      </section>
   )
}
