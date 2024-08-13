import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferCardType} from '../../types/offer.ts';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../../const.tsx';

export const fetchOffers = createAsyncThunk<OfferCardType[], void, {extra: AxiosInstance}>('fetchOffers/all', async (_arg, {extra: api}) => {
  const response = await api.get<OfferCardType[]>(AppRoute.Offers);
  return response.data;
});
