

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import categoryProcServices from './categoryProcServices';
import { AsyncState } from '../../types/CommonTpye';
import { CategoryProduct } from '../../types/apiType/categoryProc.type';

const initialState: AsyncState<CategoryProduct> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getAllCategoryProduct = createAsyncThunk<CategoryProduct[]>("category-product/get-all", async () => {
   try {
      const response = await categoryProcServices.getCategoryProduct();
      return response.data.result;
   } catch (error) {
      return error
   }
})

export const customerSlice = createSlice({
   name: 'category-product',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllCategoryProduct.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllCategoryProduct.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getAllCategoryProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
