import {OfferType} from '../../types/offer.ts';
import {FavoriteStatus, RequestStatus} from '../../const.tsx';
import {createSlice} from '@reduxjs/toolkit';
import {changeFavorite, fetchFavorites} from '../favorites-thunk/favorites-thunk.ts';

type FavoritesState = {
  items: OfferType[];
  status: RequestStatus;
}

const initialState: FavoritesState = {
  items: [],
  status: RequestStatus.Idle
};

export const favoriteSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(changeFavorite.fulfilled, (state, action) => {
      switch (action.payload.status) {
        case FavoriteStatus.Added:
          state.items.push(action.payload.offer);
          break;
        case FavoriteStatus.Removed:
          state.items = state.items.filter(({id}) => id !== action.payload.offer.id);
      }
    });
    builder.addCase(changeFavorite.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(changeFavorite.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'favorites',
  reducers: {}
});
