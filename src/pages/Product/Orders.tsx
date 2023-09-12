import { useEffect } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { getOrder } from "../../features/order/orderSlice"
import { useSelector } from "react-redux"
import { Loading } from "../../components/loading/Loading"
import { formatDate } from "../../utils/util"
// import { ActionDetails } from "../../components/detailsAction/ActionDetails"


export const Orders = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getOrder())
   }, [dispatch])

   const { data, isLoading } = useSelector((state: RootState) => state.orders)
   if (isLoading) return <Loading isFull />

   console.log("🚀 ~ file: Brands.tsx:16 ~ Brands ~ data:", data)


   return (
      <section className="content-main">
         <div className="content-header">
            <div>
               <h2 className="content-title card-title">Order List (chú ý việc chọn màu status va xu ly action)</h2>
            </div>
            <div>
               <input type="text" placeholder="Search order ID" className="form-control bg-white" />
            </div>
         </div>
         <div className="card mb-4">
            <header className="card-header">
               <div className="row gx-3">
                  <div className="col-lg-4 col-md-6 me-auto">
                     <input type="text" placeholder="Search..." className="form-control" />
                  </div>
                  <div className="col-lg-2 col-6 col-md-3">
                     <select className="form-select">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Disabled</option>
                        <option defaultChecked>Show all</option>
                     </select>
                  </div>
               </div>
            </header>

            <div className="card-body">
               <div className="table-responsive">
                  <table className="table table-hover">
                     <thead>
                        <tr>
                           <th>#ID</th>
                           <th scope="col">Product name</th>
                           <th scope="col">Email order</th>
                           <th scope="col">Quantities</th>
                           <th scope="col">Total</th>
                           <th scope="col">Status</th>
                           <th scope="col">Date</th>
                           <th scope="col" className="text-end">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((item) => (
                           <tr key={item._id}>
                              <td style={{ width: "200px" }}>{item._id}</td>
                              <td><b>{item.products_data[0].title}</b></td>
                              <td>{item.orderby}</td>
                              <td>{item.products[0].count}</td>
                              <td>${item.payment_intent.amount}</td>
                              <td><span className="badge rounded-pill alert-warning">{item.payment_intent.status}</span></td>
                              <td>{formatDate(item.updated_at)}</td>
                              {/* <ActionDetails /> */}
                           </tr>
                        ))}
                        <tr>
                           <td>0901</td>
                           <td><b>Marvin McKinney</b></td>
                           <td>marvin@example.com</td>
                           <td>$9.00</td>
                           <td><span className="badge rounded-pill alert-warning">Pending</span></td>
                           <td>03.12.2020</td>
                           <td className="text-end">

                              <div className="dropdown">
                                 <a href="#" data-bs-toggle="dropdown" className="btn btn-light rounded btn-sm font-sm"> <i className="material-icons md-more_horiz"></i> </a>
                                 <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">View detail</a>
                                    <a className="dropdown-item" href="#">Edit info</a>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td>2323</td>
                           <td><b>Leslie Alexander</b></td>
                           <td>leslie@example.com</td>
                           <td>$46.61</td>
                           <td><span className="badge rounded-pill alert-warning">Pending</span></td>
                           <td>21.02.2020</td>
                           <td className="text-end">
                              <div className="dropdown">
                                 <a href="#" data-bs-toggle="dropdown" className="btn btn-light rounded btn-sm font-sm"> <i className="material-icons md-more_horiz"></i> </a>
                                 <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">View detail</a>
                                    <a className="dropdown-item" href="#">Edit info</a>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                 </div>
                              </div>

                           </td>
                        </tr>
                        <tr>
                           <td>1233</td>
                           <td><b>Esther Howard</b></td>
                           <td>esther@example.com</td>
                           <td>$12.00</td>
                           <td><span className="badge rounded-pill alert-danger">Canceled</span></td>
                           <td>03.07.2020</td>
                           <td className="text-end">

                              <div className="dropdown">
                                 <a href="#" data-bs-toggle="dropdown" className="btn btn-light rounded btn-sm font-sm"> <i className="material-icons md-more_horiz"></i> </a>
                                 <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">View detail</a>
                                    <a className="dropdown-item" href="#">Edit info</a>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                 </div>
                              </div>
                           </td>
                        </tr>



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

