

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productServices from './productServices';
import { AsyncState } from '../../types/CommonTpye';
import { Product } from '../../types/apiType/product.type';

const initialState: AsyncState<Product> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getproducts = createAsyncThunk<Product[]>("auth/login", async () => {
   try {
      const response = await productServices.getProducts();
      return response.data.result;
   } catch (error) {
      return error
   }
});

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getproducts.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getproducts.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

         })
         .addCase(getproducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default productSlice.reducer;
