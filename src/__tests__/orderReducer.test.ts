import { addOrder } from '../services/order/action';
import { initialState, orderSlice } from '../services/order/slice';

const mockOrder = {
  orders: [
    {
      _id: '673911d5b27b06001c3e89e3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Cratorny Immortal Spicy Burger',
      createdAt: '2024-11-16T21:42:45.453Z',
      updatedAt: '2024-11-16T21:42:46.346Z',
      number: 59585
    },
    {
      _id: '673a5e16b27b06001c3e8cbd',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Cratorny Spicy Bio-Martian Burger',
      createdAt: '2024-11-17T21:20:22.311Z',
      updatedAt: '2024-11-17T21:20:23.181Z',
      number: 59637
    },
    {
      _id: '673a5eaab27b06001c3e8cc3',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Fluorescent Luminescent Burger',
      createdAt: '2024-11-17T21:22:50.216Z',
      updatedAt: '2024-11-17T21:22:51.036Z',
      number: 59638
    }
  ]
};

describe('orderSlice tests', () => {
  it('should verify initial state', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should reset state with resetOrderState', () => {
    const action = orderSlice.actions.resetOrderState();
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle pending state for addOrder request', () => {
    const action = { type: addOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  it('should handle fulfilled state for addOrder request', () => {
    const action = {
      type: addOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  it('should handle error state for addOrder request', () => {
    const action = {
      type: addOrder.rejected.type,
      payload: 'errorMessage'
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: 'errorMessage'
    });
  });
});
