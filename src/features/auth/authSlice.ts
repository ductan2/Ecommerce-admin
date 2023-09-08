import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';
import { ResponseMessageType } from '../../types/CommonTpye';
const userFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {};

const initialState = {
   user: userFromLocalStorage,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: [] as ResponseMessageType[],
}
export const login = createAsyncThunk("auth/login", async (body: { email: string, password: string }, thunkAPI) => {
   try {
      return await authServices.loginAccount(body);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
   }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      LOGIN: (state, action) => {
         console.log(action.payload)
         state.user = action.payload;
         state.isSuccess = true;
         state.isLoading = false;
         state.message = [];
      },
   },

})

export default authSlice.reducer;
export const { LOGIN } = authSlice.actions;
