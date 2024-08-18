import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferType} from '../../types/offer.ts';
import {AxiosInstance} from 'axios';
import {AppRoute, FavoriteStatus} from '../../const.tsx';

type ChangeProps = {
  offerId: string;
  status: FavoriteStatus;
}

type ChangeResponse = {
  offer: OfferType;
  status: FavoriteStatus;
}

export const fetchFavorites = createAsyncThunk<OfferType[], undefined, {extra: AxiosInstance}>('favorite/fetchAll', async (
  _arg, {extra: api}) => {
  const response = await api.get<OfferType[]>(AppRoute.Favorite);
  return response.data;
});

export const changeFavorite = createAsyncThunk<ChangeResponse, ChangeProps, {extra: AxiosInstance}>('favorite/change', async (
  {offerId, status}, {extra: api}) => {
  const response = await api.post<OfferType>(`${AppRoute.Favorite}/${offerId}/${status}`);
  return {offer: response.data, status};
});


