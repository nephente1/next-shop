import { createSlice } from '@reduxjs/toolkit';

export interface ProductData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  id: string;
  amount: number;
}

interface CartStateTypes {
  cartData: Array<ProductData>;
}

export const initialState: CartStateTypes = {
  cartData: [],
};

const CART_SLICE = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartData[itemIndex].amount! += 1;
      } else {
        const product = { ...action.payload, amount: 1 };
        state.cartData.push(product);
      }
    },
    REMOVE_FROM_CART(state, action) {
      const updatedCart = state.cartData.filter((p) => p.id !== action.payload.id);
      state.cartData = updatedCart;
    },

    REDUCE_PRODUCT(state, action) {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);

      if (state.cartData[itemIndex].amount! > 1) {
        state.cartData[itemIndex].amount! -= 1;
      } else if (state.cartData[itemIndex].amount === 1) {
        const updatedCart = state.cartData.filter((p) => p.id !== action.payload.id);
        state.cartData = updatedCart;
      }
    },
  },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, REDUCE_PRODUCT } = CART_SLICE.actions;

export default CART_SLICE.reducer;
