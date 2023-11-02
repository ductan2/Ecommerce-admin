import { Link, useNavigate } from "react-router-dom"
import { Heading } from "../components/heading/Heading"
import { Button } from "../components/button/Button"
import { AiOutlineLike, AiOutlineDislike, AiOutlineEye } from 'react-icons/ai'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { deleteBlog, getAllBlog } from "../features/blog/blogSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { formatDate } from "../utils/util"
import { UploadImageType } from "../types/CommonTpye"
import swal from "sweetalert2"
import { deleteImage } from "../features/uploads/uploadSlice"
import { Blog } from "../types/apiType/blog.type"
const itemsPerPage = 12;
export const BlogList = () => {
  const [sortItem, setSortItem] = useState<string>("")
  const dispatch = useAppDispatch();
  const searchParams = location.search.slice(1);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchParams) {
      dispatch(getAllBlog(searchParams))
    }
    else dispatch(getAllBlog())
  }, [dispatch, searchParams])
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useSelector((state: RootState) => state.blog)
  useEffect(() => {
    setBlogList(data)
  }, [data])
  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  const handleDeleteBlog = (idBlog: string, image: string | UploadImageType) => {
    try {

      swal({
        title: 'Are you sure delete it?',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(function () {
        dispatch(deleteBlog(idBlog))
        if (typeof image === "object") {
          dispatch(deleteImage(image?.public_id as string))
        }
        swal(
          'Deleted!',
          'Product has been deleted.',
          'success'
        )
        setTimeout(() => {
          dispatch(getAllBlog())
        }, 200)
      })
    } catch (error) {
      console.log(error)
    }
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
    navigate(`/admin/blogs/list?${newSearchParams}`);
  }
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortItem(e.target.value)
    if (e.target.value === "") {
      return navigate(`/admin/blogs/list`);

    }
    else return navigate(`/admin/blogs/list?sort=${e.target.value}`);

  }
  if (isLoading) return <Loading isFull />
  return (
    <section className="content-main">
      <Heading title="Blog list" />
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
              <select className="form-select" value={sortItem} onChange={handleSort}>
                <option value="" defaultChecked>Lasted created</option>
                <option value={"-numViews"}>Most viewed</option>
                <option value={"-likes"}>Most liked</option>
                <option value={"-title"}>Name(a-&gt;z)</option>
                <option value={"title"}>Name(z-&gt;a)</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <div className="row gx-3 row-cols-1  row-cols-xl-2 row-cols-xxl-3">
            {blogList.slice(0, currentPage * itemsPerPage).map((item) => {
              return <div className="col mb-15" key={item._id} >
                <div className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    <img src={typeof item.images === "string" ? item.images : item.images?.url} alt="blog" />
                  </a>
                  <div className="info-wrap">
                    <div >
                      <a href="#" className="title text-truncate"><strong className="font-bold mr-5">Name:</strong>
                        {item.title} </a>
                      <span><strong className="font-bold mr-5">Auth:</strong>{item.author}</span>
                    </div>
                    <span><strong className="font-bold mr-5">Create:</strong>{formatDate(item.created_at as string)}</span>
                    <div className="interaction mb-2">
                      <div>
                        <AiOutlineLike /> {item.likes?.length}
                      </div>
                      <div>
                        <AiOutlineDislike /> {item.dislikes?.length}
                      </div>
                      <div>
                        <AiOutlineEye /> {item.numViews}
                      </div>
                    </div>
                    <div className="">
                      <Link to={`/admin/blogs/${item._id}`}>
                        <Button className="btn btn-sm font-sm rounded btn-brand px-4 py-2 mr-3"> <i className="material-icons md-edit" ></i> Edit </Button>
                      </Link>
                      <Button className="btn btn-sm font-sm btn-light rounded px-4 py-2" onClick={() => handleDeleteBlog(item._id as string, item.images!)}> <i className="material-icons md-delete_forever"></i> Delete </Button>
                    </div>
                  </div>
                </div>
              </div>
            })}

          </div>
          <div className="flex-center">
            <Button className="btn font-sm btn-brand font-bold px-4 py-2" onClick={handleShowMore}>Show more ...</Button>

          </div>
        </div>

      </div>
    </section>
  )
}
