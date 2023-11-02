/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productServices from './productServices';
import { AsyncState } from '../../types/CommonTpye';
import { Product } from '../../types/apiType/product.type';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';

export interface AsyncStateWithPage<T> extends AsyncState<T> {
   itemPerPage: number;
   totalItem: number
   page?: number
}

const ITEMPERPAGE = 10;
const initialState: AsyncStateWithPage<Product> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   itemPerPage: ITEMPERPAGE,
   totalItem: 0,
}

export const getAllProducts = createAsyncThunk<{ data: Product[], total: number }, { query?: string, page?: number, limit?: number }>("products/get-all-product", async ({ query, page, limit = ITEMPERPAGE }) => {
   try {
      const response = await productServices.getAllProductServices(query, page, limit);
      return response.data.result;
   } catch (error) {
      return error
   }
});

export const createProduct = createAsyncThunk<Product, Product>("products/create", async (data, thunkAPI) => {
   try {
      const response = await productServices.createProductServices(data);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const updateProduct = createAsyncThunk<Product, { data: Product, id: string }>("products/update", async ({ data, id }, thunkAPI) => {
   try {
      const response = await productServices.updateProductServices(data, id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const getProductById = createAsyncThunk<Product, string>("products/get-by-id", async (id, thunkAPI) => {
   try {
      const response = await productServices.getAProductServices(id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const deleteProduct = createAsyncThunk<Product, string>("products/delete", async (id, thunkAPI) => {
   try {
      const response = await productServices.deleteProductService(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllProducts.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllProducts.fulfilled, (state, action) => {
            const data = action.payload.data;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
            state.totalItem = action.payload.total;
            state.page = Math.ceil(state.totalItem / state.itemPerPage);
         })
         .addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;

         })
         .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
            if (state.isSuccess) {
               swal({
                  title: "Success!",
                  text: "Product has been created.",
                  type: "success",
               }).then(() => {
                  window.location.href = "/admin/products/list";
               });
            }
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            if (action.payload) {
               toast.error((action.payload as any).response?.data[0].error);
            }
         })
         .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if (state.isSuccess) {
               swal(
                  'Deleted!',
                  'Product has been deleted.',
                  'success'
               )
            }
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            if (action.payload) {
               toast.error((action.payload as any).response?.data[0].error);
            }
         })
         .addCase(getProductById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         }).addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.data.findIndex((brand) => brand._id === action.payload._id);
            if (index !== -1) {
               state.data[index] = action.payload;
            }
            if (state.isSuccess) {
               swal({
                  title: "Success!",
                  text: "Product has been updated.",
                  type: "success",
               }).then(() => {
                  window.location.href = "/admin/products/list";
               });
            }
         })
         .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            if (state.isError) {
               swal({
                  title: "Error!",
                  text: (action.payload as any).response.data[0].error,
                  type: "error",
               })
            }
         })
   }
})

export default productSlice.reducer;
