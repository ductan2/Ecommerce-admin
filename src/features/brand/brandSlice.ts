

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import brandServices from './brandServices';
import { AsyncState, UploadImageType } from '../../types/CommonTpye';
import { Brand } from '../../types/apiType/brand.type';

const initialState: AsyncState<Brand> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getAllBrand = createAsyncThunk<Brand[]>("brands/get-all", async () => {
   try {
      const response = await brandServices.getBrandsServices();
      return response.data.result;
   } catch (error) {
      return error
   }
})
export const createBrand = createAsyncThunk<Brand, { title: string, images: UploadImageType }>("brands/create", async (data, thunkAPI) => {
   try {
      const response = await brandServices.createbrandServices({ title: data.title, images: data.images });
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateBrand = createAsyncThunk<Brand, {id:string,title:string,images:UploadImageType | string}>("brands/update", async (data, thunkAPI) => {
   try {
      const response = await brandServices.editBrandServices(data);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const deleteBrand = createAsyncThunk<Brand, string>("brands/delete", async (id, thunkAPI) => {
   try {
      const response = await brandServices.deleteBrandServices(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})



export const customerSlice = createSlice({
   name: 'brands',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllBrand.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllBrand.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getAllBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         }).addCase(createBrand.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteBrand.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = state.data.filter((brand) => brand._id !== action.payload._id);
         })
         .addCase(deleteBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(updateBrand.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.data.findIndex((brand) => brand._id === action.payload._id);
            if(index !== -1){
               state.data[index] = action.payload;
            }
          })
          .addCase(updateBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
          })
   }
})

export default customerSlice.reducer;
