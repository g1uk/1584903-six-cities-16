import {OfferType, SortOption} from '../../types/offer.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RequestStatus} from '../../const.tsx';
import {fetchOffers} from '../offers-thunk/offers-thunk.ts';

type OffersState = {
  activeOffer?: OfferType | null;
  currentCity: string;
  offers: OfferType[];
  sortOption: SortOption;
  status: RequestStatus;
}

const initialState: OffersState = {
  activeOffer: null,
  currentCity: 'Paris',
  offers: [],
  sortOption: 'Popular',
  status: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'offers',
  initialState,
  reducers: {
    updateOffers: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload
          ? {...offer, isFavorite: !offer.isFavorite}
          : offer);
    },
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
  }
});

export const {setCurrentCity, setSortOption, updateOffers} = offersSlice.actions;
