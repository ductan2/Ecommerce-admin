import { useEffect, useState } from 'react'
import { formatDate } from '../../utils/util'

import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { createBlogCategory, deleteBlogCategory, getAllBlogCategory, getBlogCategoryById, updateBlogCategory } from '../../features/blogCategory/blogCategorySlice'
import { Loading } from '../../components/loading/Loading'
import { Heading } from '../../components/heading/Heading'
import { ActionDetails } from '../../components/detailsAction/ActionDetails'
import swal from 'sweetalert2'
import { BlogCate } from '../../types/apiType/blogProc.type'
import { useForm } from "react-hook-form";
import { schemaWithTitle } from '../../utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { ModalCustomTitle } from '../../components/modal/ModalCustomTitle'
import { InputCustom } from '../../components/input/InputCustom'
import { Button } from '../../components/button/Button'


export const BlogCategory = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isItem, setIsItem] = useState<string>("")
  const [categoryBlog, setCategoryBlog] = useState<BlogCate[]>([]);
  const dispatch = useAppDispatch()
  const { handleSubmit, control, reset } = useForm<BlogCate>({
    mode: "onChange",
    resolver: yupResolver(schemaWithTitle("color")),
    defaultValues: {
      title: ""
    }
  });
  useEffect(() => {
    dispatch(getAllBlogCategory())
  }, [dispatch])
  const { data, isLoading, dataUpdate } = useSelector((state: RootState) => state.blogCategory)

  const handleDelete = (id: string): void => {
    swal({
      title: 'Are you sure delete it?',
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {
      dispatch(deleteBlogCategory(id))
      swal(
        'Deleted!',
        'Product has been deleted.',
        'success'
      )
      setTimeout(() => {
        dispatch(getAllBlogCategory())
      }, 500);
    })
  }
  useEffect(() => {
    setCategoryBlog(data)
  }, [data])
  const openModal = async (id: string) => {
    setIsItem(id);
    await dispatch(getBlogCategoryById(id)); // Chờ cho dữ liệu được tải xong
    setIsOpen(true);
  }
  useEffect(() => {
    if (dataUpdate) {
      reset(dataUpdate); // Reset dữ liệu form khi dataUpdate thay đổi
    }
  }, [dataUpdate, reset]);
  const handleUpdateCategoryBlog = (id: string) => handleSubmit((data) => {
    try {
      dispatch(updateBlogCategory({ id, title: data.title }));
      swal({
        title: 'Success!',
        text: "Category blog has been updated.",
        type: 'success',
      }).then(() => {
        setIsOpen(false)
        dispatch(getAllBlogCategory())
        reset({
          title: ""
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
  const onSubmit = handleSubmit((data) => {
    try {
      dispatch(createBlogCategory(data.title))
      swal({
        title: 'Success!',
        text: "Category blog has been created.",
        type: 'success',
      }).then(() => {
        dispatch(getAllBlogCategory())
        reset({
          title: ""
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
  if (isLoading) return <Loading isFull />
  return (
    <>
      <section className="content-main">
        <Heading title='Categories Blog' slogan='Add, edit or delete a category' />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <form onSubmit={onSubmit}>
                  <InputCustom label="Category blog" control={control} type="text" placeholder="Category blog" name="title" />
                  <div className="d-grid">
                    <Button className="btn btn-primary">
                      Create color
                    </Button>
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
                      {categoryBlog.map((item) => (
                        <tr key={item._id}>
                          <td className="text-center">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{item._id}</td>
                          <td><b>{item.title}</b></td>
                          <td>{formatDate(item.created_at as string)}</td>
                          <td>{formatDate(item.updated_at as string)}</td>
                          <ActionDetails handleDelete={handleDelete} _id={item._id} openModal={() => openModal(item._id as string)} />
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
      <ModalCustomTitle control={control}
        functionSubmit={handleUpdateCategoryBlog(isItem)}
        title="Update category product" name="title"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen} placeholder="Category blog" />
    </>
  )
}
