import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        bun: action.payload,
        ingredients: state.ingredients
      }),
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        bun: state.bun,
        ingredients:
          state.ingredients === undefined
            ? [action.payload]
            : [...state.ingredients, action.payload]
      }),
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredient: (state) => state.ingredients
  }
});

export const { addBun, addIngredient } = constructorSlice.actions;
export const { getBun, getIngredient } = constructorSlice.selectors;

// addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
//   if (action.payload.type === 'bun') {
//     state.bun = action.payload;
//   } else {
//     if (state.ingredients.length === 0) {
//       state.ingredients = [action.payload];
//     } else {
//       state.ingredients.push(action.payload);
//     }
//   }
// }
