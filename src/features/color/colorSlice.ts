

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
   dataUpdate: undefined,
}

export const getColors = createAsyncThunk<Color[]>("color/get-all", async () => {
   try {
      const response = await colorServices.getColorsServices();
      return response.data.result;
   } catch (error) {
      return error
   }
})

export const createColor = createAsyncThunk<Color, string>("color/create", async (title, thunkAPI) => {
   try {
      const response = await colorServices.createColorServices({ title });
     
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const deleteColor = createAsyncThunk<Color, string>("color/delete", async (id, thunkAPI) => {
   try {
      const response = await colorServices.deleteColorServices(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateColor = createAsyncThunk<Color, { id: string, title: string }>("color/update", async (data, thunkAPI) => {
   try {
      const response = await colorServices.updateColorServices(data.id, data.title);
      
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getColorById = createAsyncThunk<Color, string>("color/get-by-id", async (id, thunkAPI) => {
   try {
      const response = await colorServices.getColorByIdServices(id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const customerSlice = createSlice({
   name: 'color',
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
         .addCase(createColor.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data.push(action.payload);
         })
         .addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteColor.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = state.data.filter((color) => color._id !== action.payload._id);
         })
         .addCase(deleteColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getColorById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getColorById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getColorById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         }).addCase(updateColor.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.data.findIndex((color) => color._id === action.payload._id);
            if (index !== -1) {
               state.data[index] = action.payload;
            }
         })
         .addCase(updateColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
