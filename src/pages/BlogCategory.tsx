import { useEffect } from 'react'
import { formatDate } from '../utils/util'

import { RootState, useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getAllBlogCategory } from '../features/blogCategory/blogCategorySlice'
import { Loading } from '../components/loading/Loading'


export const BlogCategory = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllBlogCategory())
  }, [dispatch])
  const { data, isLoading } = useSelector((state: RootState) => state.blogCategory)
  if (isLoading) return <Loading isFull />

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Categories</h2>
            <p>Add, edit or delete a category</p>
          </div>
          <div>
            <input type="text" placeholder="Search Categories" className="form-control bg-white" />
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <form>
                  <div className="mb-4">
                    <label htmlFor="product_name" className="form-label">Name</label>
                    <input type="text" placeholder="Type here" className="form-control" id="product_name" />
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary">Create category</button>
                  </div>
                </form>
              </div>
              <div className="col-md-9">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" />
                          </div>
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item._id}>
                          <td className="text-center">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{item._id}</td>
                          <td><b>{item.title}</b></td>
                          <td>{formatDate(item.created_at)}</td>
                          <td>{formatDate(item.updated_at)}</td>
                          <td className="text-end">
                            <a href="#" className="btn btn-sm text-danger font-sm btn-delete">
                              <i className="material-icons md-delete_forever"></i> Delete
                            </a>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
