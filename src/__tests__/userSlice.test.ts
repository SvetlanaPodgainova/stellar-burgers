import { logoutUser, registerUser, updateUser } from '../services/user/actions';
import { initialState, userSlice } from '../services/user/slice';

const mockUser = {
  user: {
    email: 'svetlana@yandex.tu',
    name: 'Svetlana'
  }
};

const mockIsAuthChecked = true;

describe('тест пользователя', () => {
  it('проверка начального состояния', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест сохранения данных пользователя', () => {
    const action = userSlice.actions.setUser(mockUser.user);
    const newState = userSlice.reducer(initialState, action);
    expect(newState.user).toEqual(mockUser.user);
  });

  it('проверка isAuthChecked', () => {
    const action = userSlice.actions.setIsAuthChecked(mockIsAuthChecked);
    const newState = userSlice.reducer(initialState, action);
    expect(newState.isAuthChecked).toEqual(mockIsAuthChecked);
  });

  it('тест на загрузку запроса registerUser', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(false);
    expect(state.isLoading).toBe(true);
  });

  it('тест на выполнение запроса registerUser', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser.user);
  });

  it('тест на ошибку registerUser', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.isAuthChecked).toBe(true);
  });

  it('тест на загрузку запроса updateUser', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('тест на выполнение запроса updateUser', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser.user);
  });

  it('тест на ошибку updateUser', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.isAuthChecked).toBe(true);
  });

  it('тест на загрузку запроса logoutUser', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('тест на выполнение запроса logoutUser', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
  });

  it('тест на ошибку logoutUser', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.isAuthChecked).toBe(true);
  });
});
