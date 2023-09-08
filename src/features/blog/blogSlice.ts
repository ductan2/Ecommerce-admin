

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BlogServices from './blogServices';
import { AsyncState } from '../../types/CommonTpye';
import { Blog } from '../../types/apiType/blog.type';

const initialState: AsyncState<Blog> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getAllBlog = createAsyncThunk<Blog[]>("blog-category/get-all", async () => {
   try {
      const response = await BlogServices.getAllBlog();
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
      builder.addCase(getAllBlog.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllBlog.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getAllBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
