import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../services/user/actions';
import { initialState, userSlice } from '../services/user/slice';

const mockUser = {
  email: 'svetlana@yandex.tu',
  name: 'Svetlana'
};

const mockIsAuthChecked = true;

describe('тест пользователя', () => {
  it('проверка начального состояния', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест сохранения данных пользователя', () => {
    const action = userSlice.actions.setUser(mockUser);
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('проверка isAuthChecked', () => {
    const action = userSlice.actions.setIsAuthChecked(mockIsAuthChecked);
    const newState = userSlice.reducer(initialState, action);
    expect(newState.isAuthChecked).toEqual(mockIsAuthChecked);
  });

  it('тест на загрузку запроса registerUser', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест на выполнение запроса registerUser', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('тест на ошибку запроса registerUser', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('тест на загрузку запроса loginUser', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест на выполнение запроса loginUser', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('тест на ошибку запроса loginUser', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('тест на загрузку запроса updateUser', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест на выполнение запроса updateUser', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('тест на ошибку запроса updateUser', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('тест на загрузку запроса logoutUser', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      isAuthChecked: true
    });
  });

  it('тест на выполнение запроса logoutUser', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('тест на ошибку запроса logoutUser', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });
});
