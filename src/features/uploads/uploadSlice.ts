

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import uploadServices from './uploadServices';
import { AsyncState, UploadImageType } from '../../types/CommonTpye';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: AsyncState<UploadImageType> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const uploadImage = createAsyncThunk<UploadImageType[], File[] | File>("uploads/", async (data: File[] | File) => {
   try {
      console.log("data", data)
      const formData = new FormData();
      if (Array.isArray(data)) {
         for (let i = 0; i < data.length; i++) {
            console.log("data[i]", data[i])
            formData.append("image", data[i]);
         }
      }
      else {
         formData.append("image", data);
      }
      console.log("formData", formData)
      const response = await uploadServices.uploadImageServices(formData);
      return response.result;
   } catch (error) {
      return error
   }
});
export const deleteImage = createAsyncThunk<UploadImageType[], string>("delete-image/", async (id:string,thunkAPI) => {
   try {
      return await uploadServices.deleteImage(id);
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const uploadSlice = createSlice({
   name: 'uploads',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(uploadImage.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(uploadImage.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

         })
         .addCase(uploadImage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteImage.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = [];
          })
          .addCase(deleteImage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload as string;
          });
   }
})

export default uploadSlice.reducer;
