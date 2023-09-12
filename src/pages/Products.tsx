import { useSelector } from "react-redux"
import { Product } from "../types/apiType/product.type"
import { AsyncState } from "../types/CommonTpye"
import { useEffect } from "react"
import { getproducts } from "../features/product/productSlice"
import { useAppDispatch } from "../store/store"
import { Loading } from "../components/loading/Loading"
import { Heading } from "../components/heading/Heading"

export const Products = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getproducts())
  }, [dispatch])

  const { data, isLoading } = useSelector((state: { products: AsyncState<Product> }) => state.products)
  if (isLoading) return <Loading isFull />
  return (
    <>
      <section className="content-main">
        <Heading title="Product List"/>
        <div className="card mb-4">
          <header className="card-header">
            <div className="row gx-3">
              <div className="col-lg-4 col-md-6 me-auto">
                <input type="text" placeholder="Search..." className="form-control" />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" defaultValue={"All category"}>
                  <option selected>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" defaultValue={"Latest added"}>
                  <option selected>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            <div className="row gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5">
              {data.map((product: Product) => (
                <div className="col mb-15" key={product._id}>
                  <div className="card card-product-grid">
                    <a href="#" className="img-wrap">
                      <img src={product?.images[0]?.url || ""} alt="product" />
                    </a>
                    <div className="info-wrap">
                      <a href="#" className="title text-truncate">{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</a>
                      <div className="price mb-2">${product.price}</div>
                      <a href="#" className="btn btn-sm font-sm rounded btn-brand mr-3"> <i className="material-icons md-edit"></i> Edit </a>
                      <a href="#" className="btn btn-sm font-sm btn-light rounded"> <i className="material-icons md-delete_forever"></i> Delete </a>
                    </div>
                  </div>
                </div>
              ))}



            </div>

          </div>

        </div>
        <div className="pagination-area mt-30 mb-50">
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
    </>
  )
}
