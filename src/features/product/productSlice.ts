
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productServices from './productServices';
import { AsyncState } from '../../types/CommonTpye';
import { Product } from '../../types/apiType/product.type';

export interface AsyncStateWithPage<T> extends AsyncState<T> {
   itemPerPage: number;
   totalItem: number
   page?: number
}

const ITEMPERPAGE = 20;
const initialState: AsyncStateWithPage<Product> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   itemPerPage: ITEMPERPAGE,
   totalItem: 0,
}

export const getAllProduct = createAsyncThunk<{ data: Product[], total: number }, { query?: string, page?: number, limit?: number }>("products/get-all-product", async ({ query, page, limit = ITEMPERPAGE }) => {
   try {
      const response = await productServices.getAllProductServices(query, page, limit);
      console.log(response.data.result)
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
      builder.addCase(getAllProduct.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllProduct.fulfilled, (state, action) => {
            const data = action.payload.data;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            
            if (Array.isArray(data)) {
               state.data = data;
            }
            state.totalItem = action.payload.total;
            console.log(state.totalItem)
            state.page = Math.ceil(state.totalItem / state.itemPerPage);
         })
         .addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
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
         })
         .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default productSlice.reducer;
