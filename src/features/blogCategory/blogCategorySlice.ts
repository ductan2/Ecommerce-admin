

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

export const getAllBlogCategory = createAsyncThunk<BlogCate[]>("category-blog/get-all", async () => {
   try {
      const response = await blogCategoryServices.getCategoryBlogServices();
      return response.data.result;
   } catch (error) {
      return error
   }
})
export const createBlogCategory = createAsyncThunk<BlogCate, string>("category-blog/create", async (title, thunkAPI) => {
   try {
      const response = await blogCategoryServices.createCategoryBlogServices({ title });
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const deleteBlogCategory = createAsyncThunk<BlogCate, string>("category-blog/delete", async (id, thunkAPI) => {
   try {
      const response = await blogCategoryServices.deleteBlogCategoryServices(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateBlogCategory = createAsyncThunk<BlogCate, { id: string, title: string }>("category-blog/update", async (data, thunkAPI) => {
   try {
      const response = await blogCategoryServices.updateBlogCategoryServices(data.id, data.title);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getBlogCategoryById = createAsyncThunk<BlogCate, string>("category-blog/get-by-id", async (id, thunkAPI) => {
   try {
      const response = await blogCategoryServices.getBlogCategoryByIdServices(id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const blogSlice = createSlice({
   name: 'category-blog',
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
         .addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteBlogCategory.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = state.data.filter((item) => item._id !== action.payload._id);
         })
         .addCase(deleteBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getBlogCategoryById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getBlogCategoryById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getBlogCategoryById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(updateBlogCategory.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.data.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
               state.data[index] = action.payload;
            }
         })
         .addCase(updateBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default blogSlice.reducer;
