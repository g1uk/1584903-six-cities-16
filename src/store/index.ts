import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from '../features/slices/offers.ts';
import {createAPI} from '../services/api.ts';
import {offerSlice} from '../features/slices/offer.ts';
import {reviewSlice} from '../features/slices/reviews.ts';

const reducer = combineReducers({
  [offerSlice.name]: offerSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: createAPI()}}),
  reducer});


