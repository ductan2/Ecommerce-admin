
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productServices from './productServices';
import { AsyncState } from '../../types/CommonTpye';
import { Product } from '../../types/apiType/product.type';

export interface AsyncStateWithPage<T> extends AsyncState<T> {
   itemPerPage: number;
   totalItemPerPage: number
   page?: number
}


const initialState: AsyncStateWithPage<Product> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   itemPerPage: 1,
   totalItemPerPage: 1
}

export const getAllProduct = createAsyncThunk<Product[], { query?: string, page?: number,limit?:number }>("products/get-all-product", async ({ query, page ,limit=1}) => {
   try {
      const response = await productServices.getAllProductServices(query, page,limit);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const getPageAndProduct = createAsyncThunk<{ total: number}>("products/get-page", async () => {
   try {
      const response = await productServices.getProductAndPageServices();
      return response.data;
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

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllProduct.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllProduct.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

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
         .addCase(getPageAndProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getPageAndProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.totalItemPerPage = action.payload.total;
            state.page = state.totalItemPerPage / state.itemPerPage

         })
         .addCase(getPageAndProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default productSlice.reducer;
