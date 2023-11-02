import { useSelector } from "react-redux"
import { Product } from "../types/apiType/product.type"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { AsyncStateWithPage, deleteProduct, getAllProducts } from "../features/product/productSlice"
import { RootState, useAppDispatch } from "../store/store"
import { Loading } from "../components/loading/Loading"
import { Heading } from "../components/heading/Heading"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { Button } from "antd"
import swal from "sweetalert2"
import { getAllBrand } from "../features/brand/brandSlice"
import { SelectCustom } from "../components/select/SelectCustom"

export const Products = () => {
  const [nextPage, setNextPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0)
  const [brandItem, setBrandItem] = useState<string>("All")
  const [sortItem, setSortItem] = useState<string>("")
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const dispatch = useAppDispatch()
  const searchParams = location.search.slice(1);

  const { data: brandData } = useSelector((state: RootState) => state.brand)
  const { data, isLoading, page } = useSelector((state: { products: AsyncStateWithPage<Product> }) => state.products)
  const getData = (page: number, searchParams: string) => {
    const query = searchParams ? `${searchParams}` : '';
    dispatch(getAllProducts({ page, query }));
  };

  useEffect(() => {
    getData(nextPage, searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage, searchParams, dispatch])

  useEffect(() => {
    setPageCount(page || 0)// total page 
  }, [page])

  useEffect(() => {
    dispatch(getAllBrand())
  }, [dispatch]
  )
  useEffect(() => {
    if (brandItem !== "All") {
      getData(nextPage, `brand=${brandItem}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandItem, dispatch, nextPage])
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    setNextPage(+selectedPage)
  };
  const handleDelete = (id: string) => {
    console.log("🚀 ~ file: Products.tsx:57 ~ handleDelete ~ id:", id)
    swal({
      title: 'Are you sure delete it?',
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {
      dispatch(deleteProduct(id))
      
      dispatch(getAllProducts({ page: 1, query: searchParams }))
    })
  }

  const handleQuery = () => {
    const searchTerm = inputRef.current?.value;
    const currentSearchParams = new URLSearchParams(location.search);

    if (searchTerm !== "") {
      currentSearchParams.set("title", searchTerm as string);
    } else {
      currentSearchParams.delete("title");
    }
    const newSearchParams = currentSearchParams.toString();
    navigate(`/admin/products/list?${newSearchParams}`);
  };
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortItem(e.target.value)
    navigate(`/admin/products/list?sort=${e.target.value}`);
  }
  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    const currentSearchParams = new URLSearchParams(location.search);
    if (selectedBrand === "All") {
      currentSearchParams.delete("brand");
    } else {
      currentSearchParams.set("brand", selectedBrand);
    }
    setBrandItem(selectedBrand)
    const newSearchParams = currentSearchParams.toString();
    navigate(`/admin/products/list?${newSearchParams}`);
  };
  if (isLoading) return <Loading isFull />
  return (
    <>
      <section className="content-main">
        <Heading title="Product List" />
        <div className="card mb-4">
          <header className="card-header">
            <div className="row gx-3">
              <div className="col-lg-4 col-md-6 me-auto searchform">
                <div className="input-group">
                  <input name="search" type="text" className="form-control"
                    placeholder="Search term" ref={inputRef} />
                  <button className="btn btn-light bg" type="button" onClick={handleQuery}>
                    <i className="material-icons md-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-2 col-6 col-md-3">

                <SelectCustom
                  value={brandItem}
                  data={brandData}
                  defaulTitle="All Brand"
                  onChange={handleBrandChange}
                />

              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" value={sortItem} onChange={handleSort}>
                  <option value="" defaultChecked>Sort</option>
                  <option value={"price"}>Price (low to high)</option>
                  <option value={"-price"}>Price (high to low)</option>
                  <option value={"title"}>Name (a-&gt;z)</option>
                  <option value={"-title"}>Name (z-&gt;a)</option>
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
                        <a href="#" className="title text-truncate"><strong className="font-bold mr-5">Name:</strong>{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</a>
                        <span><strong className="font-bold mr-5">Brand:</strong>{product.brand}</span>
                      </div>
                      <div className="price mb-2">${product.price}</div>
                      <Link to={`/admin/products/${product._id}`}>
                        <Button className="btn btn-sm font-sm rounded btn-brand mr-3"> <i className="material-icons md-edit" ></i> Edit </Button>
                      </Link>
                      <Button className="btn btn-sm font-sm btn-light rounded" onClick={() => handleDelete(product._id as string)}> <i className="material-icons md-delete_forever"></i> Delete </Button>
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
            forcePage={nextPage - 1}
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
      </section >
    </>
  )
}
