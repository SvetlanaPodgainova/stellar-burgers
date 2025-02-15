import {
  addConstructorIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  constructorSlice,
  initialState,
  resetBurgerConstructor
} from '../services/burgerConstructor/slice';

const mockBun = {
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  id: 'bun-1'
};

const mockMainIngredient = {
  _id: '643d69a5c3f7b9001cfa0946',
  name: 'Хрустящие минеральные кольца',
  type: 'main',
  proteins: 808,
  fat: 689,
  carbohydrates: 609,
  calories: 986,
  price: 300,
  image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  image_mobile:
    'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
  id: 'ingredient-1'
};

const mockSauceIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  id: 'ingredient-2'
};

describe('constructorSlice tests', () => {
  it('should verify initial state', () => {
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should return addConstructorBun action', () => {
    const action = addConstructorIngredient(mockBun);
    const state = constructorSlice.reducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });

  it('should return addConstructorIngredient action', () => {
    const action = addConstructorIngredient(mockMainIngredient);
    const state = constructorSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual([
      { ...mockMainIngredient, id: expect.any(String) }
    ]);
  });

  it('should return resetBurgerConstructor action', () => {
    const initialStateWithIngredients = {
      ...initialState,
      bun: mockBun,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
          id: 'ingredient-1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          id: 'ingredient-2'
        }
      ]
    };
    const action = resetBurgerConstructor();
    const state = constructorSlice.reducer(initialStateWithIngredients, action);
    expect(state).toEqual(initialState);
  });

  it('should move ingredient up', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 200,
          price: 100,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ingredient-1'
        },
        {
          _id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 15,
          fat: 10,
          carbohydrates: 25,
          calories: 250,
          price: 150,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ingredient-2'
        }
      ]
    };

    const action = moveIngredientUp(1);
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 25,
        calories: 250,
        price: 150,
        image: '',
        image_mobile: '',
        image_large: '',
        id: 'ingredient-2'
      },
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        id: 'ingredient-1'
      }
    ]);
  });

  it('should move ingredient down', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 5,
          carbohydrates: 20,
          calories: 200,
          price: 100,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ingredient-1'
        },
        {
          _id: '2',
          name: 'Ingredient 2',
          type: 'main',
          proteins: 15,
          fat: 10,
          carbohydrates: 25,
          calories: 250,
          price: 150,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ingredient-2'
        }
      ]
    };

    const action = moveIngredientDown(0);
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 25,
        calories: 250,
        price: 150,
        image: '',
        image_mobile: '',
        image_large: '',
        id: 'ingredient-2'
      },
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        id: 'ingredient-1'
      }
    ]);
  });
});
