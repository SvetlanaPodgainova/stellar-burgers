import { api } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (data: string[], { rejectWithValue }) => {
    try {
      const res = await api.orderBurgerApi(data);
      if (!res?.success) {
        return rejectWithValue(res);
      }
      return res.order;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Неизвестная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);
