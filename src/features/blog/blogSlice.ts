

import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

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

export const getAllBlog = createAsyncThunk<Blog[], string | undefined>("blog/get-all", async (query) => {
   try {
      const response = await BlogServices.getAllBlogServices(query);
      return response.data.result;
   } catch (error) {
      return error
   }
})
export const createBlog = createAsyncThunk<Blog, Blog>("blog/create", async (data, thunkAPI) => {
   try {
      const response = await BlogServices.createBlogServices(data);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const deleteBlog = createAsyncThunk<Blog, string>("blog/delete", async (id, thunkAPI) => {
   try {
      const response = await BlogServices.deleteBlogServices(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateBlog = createAsyncThunk<Blog, { id: string, data: Blog }>("blog/update", async ({ id, data }, thunkAPI) => {
   try {
      const response = await BlogServices.updateBlogServices(id, data);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getBlogById = createAsyncThunk<Blog, string>("blog/get-by-id", async (id, thunkAPI) => {
   try {
      const response = await BlogServices.getBlogByIdServices(id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const resetState = createAction("Reset_all");

export const customerSlice = createSlice({
   name: 'blog',
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
         }).addCase(createBlog.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = state.data.filter((item) => item._id !== action.payload._id);
         })
         .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getBlogById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getBlogById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getBlogById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(updateBlog.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.data.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
               state.data[index] = action.payload;
            }
         })
         .addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(resetState, () => initialState);
   }
})

export default customerSlice.reducer;
