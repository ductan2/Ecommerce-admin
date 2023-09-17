

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
   dataUpdate: undefined,
}

export const getAllCategoryProduct = createAsyncThunk<CategoryProduct[]>("category-product/get-all", async () => {
   try {
      const response = await categoryProcServices.getCategoryProductService();
      return response.data.result;
   } catch (error) {
      return error
   }
})
export const createCategoryProduct = createAsyncThunk<CategoryProduct, string>("category-product/create", async (title, thunkAPI) => {
   try {
      const response = await categoryProcServices.createCategoryProductService({ title });
      console.log(response)
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const deleteCategoryProduct = createAsyncThunk<CategoryProduct, string>("color/delete", async (id, thunkAPI) => {
   try {
      const response = await categoryProcServices.deleteCategoryProductService(id);
      console.log(response)
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateCategoryProduct = createAsyncThunk<CategoryProduct, { id: string, title: string }>("color/delete", async (data, thunkAPI) => {
   try {
      const response = await categoryProcServices.updateCategoryProductService(data.id, { title: data.title });
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getCategoryProductById = createAsyncThunk<CategoryProduct, string>("color/get-by-id", async (id, thunkAPI) => {
   try {
      const response = await categoryProcServices.getCategoryProductByIdService(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
         }).addCase(createCategoryProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createCategoryProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createCategoryProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteCategoryProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteCategoryProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = state.data.filter((color) => color._id !== action.payload._id);
         })
         .addCase(deleteCategoryProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getCategoryProductById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getCategoryProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getCategoryProductById.rejected, (state, action) => {
            console.log("Action error", action.error)
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
