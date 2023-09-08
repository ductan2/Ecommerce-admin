

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import customerServices from './customServices';
import { AsyncState } from '../../types/CommonTpye';
import { User } from '../../types/apiType/user.type';

const initialState: AsyncState<User> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getUsers = createAsyncThunk<User[]>("users/get-all-user", async () => {
   try {
      const response = await customerServices.getAllUsers();
      return response.data.result;
   } catch (error) {
      return error
   }
})

export const customerSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getUsers.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getUsers.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

         })
         .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
