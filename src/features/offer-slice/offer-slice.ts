import {OfferType} from '../../types/offer.ts';
import {RequestStatus} from '../../const.tsx';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchNearby, fetchOffer} from '../offer-thunk/offer-thunk.ts';

type OfferState = {
  info: OfferType | null;
  nearby: OfferType[];
  status: RequestStatus;
};

const initialState: OfferState = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle
};

export const offerSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchOffer.fulfilled, (state, action) => {
      state.info = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchOffer.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchOffer.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchNearby.fulfilled, (state, action) => {
      state.nearby = action.payload;
    });
  },
  initialState,
  name: 'offer',
  reducers: {
    clear(state) {
      state.info = null;
      state.nearby = [];
    },
    updateOffer: (state, action: PayloadAction<string>) => {
      state.info = state.info?.id === action.payload
        ? {...state.info, isFavorite: !state.info?.isFavorite}
        : state.info;
    },
  }
});

export const {updateOffer} = offerSlice.actions;

