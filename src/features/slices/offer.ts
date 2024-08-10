import {OfferType} from '../../types/offer.ts';
import {AppRoute, RequestStatus} from '../../const.tsx';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

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

export const fetchOffer = createAsyncThunk<OfferType, string, {extra: AxiosInstance}>('fetchOffers/one', async (
  offerId, {extra: api}) => {
  const response = await api.get<OfferType>(`${AppRoute.Offers}/${offerId}`);
  return response.data;
});

export const fetchNearby = createAsyncThunk<OfferType[], string, {extra: AxiosInstance}>('fetchOffers/near', async (
  offerId, {extra: api}) => {
  const response = await api.get<OfferType[]>(`${AppRoute.Offers}/${offerId}/nearby`);
  return response.data;
});

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
    }
  }
});
