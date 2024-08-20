import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from '../features/offers-slice/offers-slice.ts';
import {createAPI} from '../services/api.ts';
import {offerSlice} from '../features/offer-slice/offer-slice.ts';
import {reviewSlice} from '../features/reviews-slice/reviews-slice.ts';
import {userSlice} from '../features/user-slice/user-slice.ts';
import {favoriteSlice} from '../features/favorites-slice/favorites-slice.ts';

export const reducer = combineReducers({
  [offerSlice.name]: offerSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI()}
    })
});


