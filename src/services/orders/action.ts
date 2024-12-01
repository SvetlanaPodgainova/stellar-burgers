import { api } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const res = await api.getOrdersApi();
  return res;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (data: number) => {
    const res = await api.getOrderByNumberApi(data);
    return res.orders.length > 0 ? res.orders[0] : null;
  }
);
