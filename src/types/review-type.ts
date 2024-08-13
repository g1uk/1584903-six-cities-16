import {UserType} from './user-type.ts';

export type Review = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
}

export const getReviewsByOfferId = (reviews: Review[], offerId: string | undefined) => reviews.filter((offer) => offer.id !== offerId).slice(0, 10);
export const getStarsText = (count: number) => `${count} star${count > 1 ? 's' : ''}`;


