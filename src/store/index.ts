import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersSlice} from '../features/slices/offers.ts';
import {createAPI} from '../services/api.ts';
import {offerSlice} from '../features/slices/offer.ts';
import {reviewSlice} from '../features/slices/reviews.ts';
import {userSlice} from '../features/slices/user.ts';
import {redirect} from './redirect.ts';
import {favoriteSlice} from '../features/slices/favorites.ts';

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
    }).concat(redirect),
});


