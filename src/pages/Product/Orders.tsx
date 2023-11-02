import { ChangeEvent, useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { getOrder, updateStatusOrder } from "../../features/order/orderSlice"
import { useSelector } from "react-redux"
import { Loading } from "../../components/loading/Loading"
import { formatDate } from "../../utils/util"
import { statusOrder } from "../../types/apiType/orders.type"
import { useNavigate } from "react-router-dom"
import { ModalCustom } from "../../components/modal/ModalCustom"
import { Button } from "../../components/button/Button"
import swal from "sweetalert2"



export const Orders = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [searchParams, setSearchParams] = useState<string>("")
   const [valueStatus, setValueStatus] = useState<string>("")
   const [modalIsOpen, setIsOpen] = useState(false);
   const [idItem, setIdItem] = useState<string>("")
   useEffect(() => {
      dispatch(getOrder())
   }, [dispatch])
   useEffect(() => {
      if (searchParams) {
         dispatch(getOrder(searchParams))
      }
      else dispatch(getOrder())
   }, [dispatch, searchParams])
   const { data, isLoading } = useSelector((state: RootState) => state.orders)

   if (isLoading) return <Loading isFull />
   function getStatusClass(orderStatus: string) {
      switch (orderStatus) {
         case statusOrder.CASH_ON_DELIVERY:
            return 'alert-primary'; // Đặt màu xanh dương cho Cash on delivery
         case statusOrder.PROCESSING:
            return 'alert-warning';
         case statusOrder.CANCELLED:
            return 'alert-danger'; // Đặt màu đỏ cho Cancelled
         case statusOrder.DELIVERED:
            return 'alert-success'; // Đặt màu xanh cho Delivered
         default:
            return 'alert-warning'; // Màu cảnh báo mặc định cho các trạng thái còn lại
      }
   }

   const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
      setSearchParams(e.target.value)
      if (e.target.value === "") {
         return navigate(`/admin/orders`);

      }
      else return navigate(`/admin/orders?search=${e.target.value}`);

   }
   const handleOpenIsModal = (id: string) => {
      setIsOpen(true)
      setIdItem(id)
   }
   const handleUpdateStatus = () => {
      if (valueStatus === "") return
      swal({
         title: 'Are you sure update it?',
         text: 'You will not be able to recover this product!',
         showCancelButton: true,
         confirmButtonText: 'Yes, updated it!',
         cancelButtonText: 'No, keep it'
      }).then(function () {
         dispatch(updateStatusOrder({ id: idItem, status: valueStatus }))
         swal(
            'Updated!',
            'Status order has been updated.',
            'success'
         )
         setTimeout(() => {
            dispatch(getOrder())
         }, 200)
      })
   }
   return (
      <>
         <section className="content-main">
            <div className="content-header">
               <div>
                  <h2 className="content-title card-title">Order List</h2>
               </div>
            </div>
            <div className="card mb-4">
               <header className="card-header">
                  <div className="row gx-3">
                     <div className="col-lg-2 col-6 col-md-3" >
                        <select className="form-select" value={searchParams} onChange={handleSort} >
                           <option value={""} >Show all</option>
                           <option value={"Cash on delivery"}>Cash on delivery</option>
                           <option value={"Processing"}>Processing</option>
                           <option value={"Cancelled"}>Cancelled</option>
                           <option value="Delivered">Delivered</option>
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
                           </tr>
                        </thead>
                        <tbody>
                           {data.map((item, index) => (
                              <tr key={item._id + index}>
                                 <td style={{ width: "200px" }}>{item._id}</td>
                                 <td><b>{item.products.product.title}</b></td>
                                 <td>{item.orderby}</td>
                                 <td>{item.products.count}</td>
                                 <td>${item.products.price}</td>
                                 <td onClick={() => handleOpenIsModal(item._id)}><span className={`badge rounded-pill ${getStatusClass(item.order_status)}`}>{(item.order_status)}</span></td>
                                 <td>{formatDate(item.created_at)}</td>
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
         <ModalCustom modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} >
            <select className="form-select" value={valueStatus} onChange={(e: ChangeEvent<HTMLSelectElement>) => setValueStatus(e.target.value)}>
               <option value={""} >Show all</option>
               <option value={"Cash on delivery"}>Cash on delivery</option>
               <option value={"Processing"}>Processing</option>
               <option value={"Cancelled"}>Cancelled</option>
               <option value="Delivered">Delivered</option>
            </select>
            <div className="mt-15">
               <Button onClick={() => setIsOpen(false)} className="btn btn-light rounded font-sm hover-up mr-15">Cancel</Button>
               <Button type="submit" onClick={handleUpdateStatus} className="btn btn-md rounded px-4 font-sm mr-5 hover-up">Save </Button>
            </div>
         </ModalCustom>
      </>

   )
}

