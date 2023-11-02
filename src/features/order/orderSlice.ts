

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import orderServices from './orderServices';
import { AsyncState } from '../../types/CommonTpye';
import { Order } from '../../types/apiType/orders.type';

const initialState: AsyncState<Order> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const getOrder = createAsyncThunk<Order[], string | undefined>("orders/get-all-orders", async (search?: string) => {
   try {
      const response = await orderServices.getOrders(search);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const updateStatusOrder = createAsyncThunk<Order[], {id:string,status:string} >("orders/update-status", async ({id,status}) => {
   try {
      const response = await orderServices.updateStatusOrderServices(id,status);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const orderSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getOrder.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getOrder.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

         })
         .addCase(getOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default orderSlice.reducer;
