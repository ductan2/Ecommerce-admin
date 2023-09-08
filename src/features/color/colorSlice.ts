

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import colorServices from './colorServices';
import { AsyncState } from '../../types/CommonTpye';
import { Color } from '../../types/apiType/color.type';

const initialState: AsyncState<Color> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getColors = createAsyncThunk<Color[]>("blog-category/get-all", async () => {
   try {
      const response = await colorServices.getColors();
      return response.data.result;
   } catch (error) {
      return error
   }
})

export const customerSlice = createSlice({
   name: 'blog-category',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getColors.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getColors.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
