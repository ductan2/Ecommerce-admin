import { useSelector } from "react-redux"
import { Product } from "../types/apiType/product.type"
import { useEffect, useState } from "react"
import { AsyncStateWithPage, getAllProduct, getPageAndProduct } from "../features/product/productSlice"
import { useAppDispatch } from "../store/store"
import { Loading } from "../components/loading/Loading"
import { Heading } from "../components/heading/Heading"
import { useLocation } from "react-router-dom"
import ReactPaginate from "react-paginate"
export const Products = () => {


  const dispatch = useAppDispatch()
  const [nextPage, setNextPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0)
  const { data, isLoading, page } = useSelector((state: { products: AsyncStateWithPage<Product> }) => state.products)
  const location = useLocation();
  const searchParams = location.search;

  const getData = (page: number, searchParams: string) => {
    if (searchParams) {
      dispatch(getAllProduct({ page: page, query: searchParams }))
    }
    else
      dispatch(getAllProduct({ page: page }))
    dispatch(getPageAndProduct())
  }
  useEffect(() => {
    getData(nextPage, searchParams)
  }, [nextPage, searchParams, dispatch])

  useEffect(() => {
    setPageCount(Math.ceil(page!))// total page 
  }, [page])

  if (isLoading) return <Loading isFull />
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    setNextPage(+selectedPage)
  };
  return (
    <>
      <section className="content-main">
        <Heading title="Product List" />
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
                      <img src={product?.images![0]?.url || ""} alt="product" />
                    </a>
                    <div className="info-wrap">
                      <div >
                        <a href="#" className="title text-truncate">{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</a>

                      </div>
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
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={nextPage-1}
            onPageActive={handlePageClick}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            activeClassName="active"
            className="pagination justify-content-start"
            containerClassName="pagination justify-content-start"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />

        </div>
      </section>
    </>
  )
}
