import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders } from './action';

type TOrdersState = {
  orders: TOrder[];
  order: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  order: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.order = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
  selectors: {
    selectOrders: (state) => state
  }
});

export const { selectOrders } = ordersSlice.selectors;
