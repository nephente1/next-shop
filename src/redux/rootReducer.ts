import { combineReducers } from 'redux';
import CART_SLICE from './cartStore';

export const rootReducer = combineReducers({
  cartReducer: CART_SLICE,
});

export type RootState = ReturnType<typeof rootReducer>;
