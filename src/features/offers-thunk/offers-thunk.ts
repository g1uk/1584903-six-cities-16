import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferType} from '../../types/offer.ts';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../../const.tsx';

export const fetchOffers = createAsyncThunk<OfferType[], void, {extra: AxiosInstance}>('fetchOffers/all', async (_arg, {extra: api}) => {
  const response = await api.get<OfferType[]>(AppRoute.Offers);
  return response.data;
});
