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
      name: 'Краторный бессмертный spicy бургер',
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
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2024-11-17T21:20:22.311Z',
      updatedAt: '2024-11-17T21:20:23.181Z',
      number: 59637
    },
    {
      _id: '673a5eaab27b06001c3e8cc3',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-11-17T21:22:50.216Z',
      updatedAt: '2024-11-17T21:22:51.036Z',
      number: 59638
    }
  ]
};

const mockState = {
  orderRequest: true,
  orderModalData: mockOrder.orders[0],
  error: 'Some error'
};

describe('тест orderSlice', () => {
  it('проверка начального состояния', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('проверка сброса состояния resetOrderState', () => {
    expect(orderSlice.reducer(mockState, { type: '' })).toEqual(mockState);
    const action = orderSlice.actions.resetOrderState();
    const newState = orderSlice.reducer(mockState, action);
    expect(newState).toEqual(initialState);
  });

  it('тест на загрузку запроса addOrder', () => {
    const action = { type: addOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  it('тест на выполнение запроса addOrder', () => {
    const action = {
      type: addOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('тест на ошибку addOrder', () => {
    const action = {
      type: addOrder.rejected.type,
      payload: 'errorMessage'
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('errorMessage');
  });
});
