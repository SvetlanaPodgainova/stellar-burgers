import { api } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () => {
  const res = await api.getFeedsApi();
  return res;
});
