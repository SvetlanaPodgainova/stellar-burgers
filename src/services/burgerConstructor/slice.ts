import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorIngredient: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredientToMove);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredientToMove);
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    resetBurgerConstructor: (state) => initialState
  },
  selectors: {
    selectConstructorItems: (state) => state
  }
});

export const {
  addConstructorIngredient,
  moveIngredientUp,
  moveIngredientDown,
  deleteIngredient,
  resetBurgerConstructor
} = constructorSlice.actions;
export const { selectConstructorItems } = constructorSlice.selectors;
