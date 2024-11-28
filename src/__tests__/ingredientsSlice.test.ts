import { ingredientsSlice, initialState } from '../services/ingredients/slice';
import { getIngredients } from '../services/ingredients/actions';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

describe('тест ingredientsSlice', () => {
  it('проверка начального состояния', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('тест на загрузку getIngredients', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест на выполнение getIngredients', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест на ошибку getIngredients', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
