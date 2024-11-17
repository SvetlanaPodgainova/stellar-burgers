import { api } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () => {
  const res = await api.getFeedsApi();
  return res;
});

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (data: number) => {
    const res = await api.getOrderByNumberApi(data);
    return res.orders.length > 0 ? res.orders[0] : null;
  }
);
