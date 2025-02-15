import { api } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngridients',
  async () => {
    const res = await api.getIngredientsApi();
    return res;
  }
);
