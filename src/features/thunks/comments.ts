import {OfferType} from '../../types/offer.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Review} from '../../types/review-type.ts';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../../const.tsx';

const fetchComments = createAsyncThunk<Review[], OfferType['id'], {extra: AxiosInstance}>('comments/fetch', async (
  offerId, {extra: api}) => {
  const response = await api.get<Review[]>(`${AppRoute.Comments}/${offerId}`);
  return response.data;
});

type PostCommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: OfferType['id'];
}

const postComment = createAsyncThunk<Review, PostCommentProps, {extra: AxiosInstance}>('comments/post', async ({
  body, offerId}, {extra: api}) => {
  const response = await api.post<Review>(`${AppRoute.Comments}/${offerId}`, body);
  return response.data;
});


export const commentsThunks = {fetchComments, postComment};
