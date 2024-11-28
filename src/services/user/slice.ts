import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      // логин
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      // обновление данных
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = null;
        state.isAuthChecked = true;
        state.error = action.error.message ?? null;
      })
      // логаут
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message ?? null;
      });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { getIsAuthChecked, getUser, getIsLoading } = userSlice.selectors;
