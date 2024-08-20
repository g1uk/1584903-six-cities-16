import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferType} from '../../types/offer.ts';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../../const.tsx';

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
