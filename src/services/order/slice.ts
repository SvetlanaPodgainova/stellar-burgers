import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { addOrder } from './action';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | unknown;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(
        addOrder.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.orderRequest = false;
          state.error = action.payload;
        }
      );
  },
  selectors: {
    selectOrder: (state) => state
  }
});

export const { selectOrder } = orderSlice.selectors;
export const { resetOrderState } = orderSlice.actions;
