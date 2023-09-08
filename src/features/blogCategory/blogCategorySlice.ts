

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogCategoryServices from './blogCategoryServices';
import { AsyncState } from '../../types/CommonTpye';
import { BlogCate } from '../../types/apiType/blogProc.type';

const initialState: AsyncState<BlogCate> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getAllBlogCategory = createAsyncThunk<BlogCate[]>("blog-category/get-all", async () => {
   try {
      const response = await blogCategoryServices.getCategoryBlog();
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
      builder.addCase(getAllBlogCategory.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllBlogCategory.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getAllBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
