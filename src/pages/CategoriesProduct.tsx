import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { createCategoryProduct, deleteCategoryProduct, getAllCategoryProduct, getCategoryProductById, updateCategoryProduct } from "../features/categoryProduct/categoryProcSlice"
import { useSelector } from "react-redux"

import { Loading } from "../components/loading/Loading"
import { formatDate } from "../utils/util"
import { Heading } from "../components/heading/Heading"
import { ActionDetails } from "../components/detailsAction/ActionDetails"
import swal from "sweetalert2"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaWithTitle } from "../utils/validation"
import { useForm } from "react-hook-form"
import { CategoryProduct } from "../types/apiType/categoryProc.type"
import { ModalCustomTitle } from "../components/modal/ModalCustomTitle"
import { InputCustom } from "../components/input/InputCustom"

export const CategoriesProduct = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [isItem, setIsItem] = useState<string>("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCategoryProduct())
    }, [dispatch])
    const { handleSubmit, control, reset } = useForm<CategoryProduct>({
        mode: "onChange",
        resolver: yupResolver(schemaWithTitle("Category product")),
        defaultValues: {
            title: ""
        }
    });

    const { data, isLoading, dataUpdate } = useSelector((state: RootState) => state.categoryProduct)

    const onSubmit = handleSubmit((data) => {
        try {
            dispatch(createCategoryProduct(data.title))
            swal({
                title: 'Success!',
                text: "Category product has been created.",
                type: 'success',
            }).then(() => {
                window.location.reload()
            })

        } catch (error) {
            console.log(error)
        }
    })
    const handleDelete = (id: string): void => {
        try {
            dispatch(deleteCategoryProduct(id))
            swal({
                title: 'Success!',
                text: "Category product has been deleted.",
                type: 'success',
            }).then(() => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = async (id: string) => {
        setIsOpen(true)
        await dispatch(getCategoryProductById(id))
        setIsItem(id)
    }
    useEffect(() => {
        if (dataUpdate) {
            reset(dataUpdate)
        }
    }, [reset, dataUpdate])

    const handleUpdateCateProc = (id: string) => handleSubmit((data) => {
        try {
            dispatch(updateCategoryProduct({ id, title: data.title }));
            swal({
                title: 'Success!',
                text: "Category product has been deleted.",
                type: 'success',
            }).then(() => {
                setIsOpen(false)
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
        }
    })
    if (isLoading) return <Loading isFull />
    return (
        <>
            <section className="content-main">
                <Heading title='Categories Product' slogan='Add, edit or delete a category' isSearch placeholder='Search Categories' />
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <form onSubmit={onSubmit}>
                                    <InputCustom label="Category product" control={control} type="text" placeholder="Category product" name="title" />
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
                                                    <td>{formatDate(item.created_at!)}</td>
                                                    <td>{formatDate(item.updated_at!)}</td>
                                                    <ActionDetails handleDelete={handleDelete} _id={item._id} handleEdit={() => handleEdit(item._id as string)} />
                                                </tr>
                                            ))}
                                            <ModalCustomTitle control={control}
                                                functionSubmit={handleUpdateCateProc(isItem as string)}
                                                title="Update Category Product" name="title"
                                                modalIsOpen={modalIsOpen}
                                                setIsOpen={setIsOpen} placeholder="Category product" />


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
