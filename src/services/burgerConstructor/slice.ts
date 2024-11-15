// import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
// import { TConstructorIngredient, TIngredient } from '@utils-types';

// type TConstructorState = {
//   bun: TConstructorIngredient | null;
//   ingredients: TConstructorIngredient[];
// };

// const initialState: TConstructorState = {
//   bun: null,
//   ingredients: []
// };

// export const constructorSlice = createSlice({
//   name: 'burgerConstructor',
//   initialState,
//   reducers: {
//     addBun: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
//         bun: action.payload,
//         ingredients: state.ingredients
//       }),
//       prepare: (ingredient: TIngredient) => {
//         const id = nanoid();
//         return {
//           payload: {
//             ...ingredient,
//             id
//           }
//         };
//       }
//     },
//     addConstructorIngredient: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
//         bun: state.bun,
//         ingredients:
//           state.ingredients === undefined
//             ? [action.payload]
//             : [...state.ingredients, action.payload]
//       }),
//       prepare: (ingredient: TIngredient) => {
//         const id = nanoid();
//         return {
//           payload: {
//             ...ingredient,
//             id
//           }
//         };
//       }
//     }
//   },
//   selectors: {
//     getConstructorBun: (state) => state.bun,
//     getConstructorIngredient: (state) => state.ingredients
//   }
// });

// export const { addBun, addConstructorIngredient } = constructorSlice.actions;
// export const { getConstructorBun, getConstructorIngredient } =
//   constructorSlice.selectors;

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
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state
  }
});

export const { addConstructorIngredient } = constructorSlice.actions;
export const { getConstructorIngredients } = constructorSlice.selectors;
