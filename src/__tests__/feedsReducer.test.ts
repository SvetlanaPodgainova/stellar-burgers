import { getFeeds } from '../services/feeds/actions';
import { feedsSlice, initialState } from '../services/feeds/slice';

const mockOrder = {
  _id: '6738a83eb27b06001c3e887e',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
  status: 'done',
  name: 'Fluorescent Luminescent Burger',
  createdAt: '2024-11-16T14:12:14.414Z',
  updatedAt: '2024-11-16T14:12:15.300Z',
  number: 59545
};

const mockFeeds = {
  orders: [mockOrder],
  total: 1,
  totalToday: 1
};

describe('feedsSlice tests', () => {
  it('should verify initial state', () => {
    expect(feedsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle pending state for getFeeds request', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState
    });
  });

  it('should handle fulfilled state for getFeeds request', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeeds
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockFeeds.orders,
      total: mockFeeds.total,
      totalToday: mockFeeds.totalToday
    });
  });
});
