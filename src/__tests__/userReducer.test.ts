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

describe('user slice tests', () => {
  it('should verify initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should save user data', () => {
    const action = userSlice.actions.setUser(mockUser);
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('should check isAuthChecked', () => {
    const action = userSlice.actions.setIsAuthChecked(mockIsAuthChecked);
    const newState = userSlice.reducer(initialState, action);
    expect(newState.isAuthChecked).toEqual(mockIsAuthChecked);
  });

  it('should handle pending state for registerUser  request', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle fulfilled state for registerUser  request', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('should handle error state for registerUser  request', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('should handle pending state for loginUser  request', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle fulfilled state for loginUser  request', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('should handle error state for loginUser  request', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('should handle pending state for updateUser  request', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle fulfilled state for updateUser  request', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });

  it('should handle error state for updateUser  request', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('should handle pending state for logoutUser  request', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      isAuthChecked: true
    });
  });

  it('should handle fulfilled state for logoutUser  request', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle error state for logoutUser  request', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: 'Error'
    });
  });
});
