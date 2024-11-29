import { getOrderByNumber, getOrders } from '../services/orders/action';
import { initialState, ordersSlice } from '../services/orders/slice';

const mockOrders = [
  {
    _id: '6738a83eb27b06001c3e887e',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-16T14:12:14.414Z',
    updatedAt: '2024-11-16T14:12:15.300Z',
    number: 59545
  },
  {
    _id: '6738a8b1b27b06001c3e8881',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-16T14:14:09.083Z',
    updatedAt: '2024-11-16T14:14:09.929Z',
    number: 59546
  },
  {
    _id: '6738b007b27b06001c3e88a9',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-16T14:45:27.577Z',
    updatedAt: '2024-11-16T14:45:28.395Z',
    number: 59548
  }
];

describe('тест ordersSlice', () => {
  it('проверка начального состояния', () => {
    expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест на загрузку запроса getOrders', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  it('тест на выполнение запроса getOrders', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('тест на выполнение запроса getOrderByNumber', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrders[0]
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrders[0]);
  });
});
