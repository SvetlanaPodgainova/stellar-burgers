import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumber, getOrders } from './action';

type TOrdersState = {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'ordersBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orders = [];
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.order = null;
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    selectOrders: (state) => state
  }
});

export const { selectOrders } = ordersSlice.selectors;
