

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

export const getOrder = createAsyncThunk<Order[]>("orders/get-all-orders", async () => {
   try {
      const response = await orderServices.getOrders();
      console.log("res", response.data.result)
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
