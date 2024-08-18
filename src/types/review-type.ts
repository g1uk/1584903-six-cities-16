import {UserType} from './user-type.ts';

export type Review = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
}

export const getReviewsByOfferId = (reviews: Review[], offerId: string | undefined) => reviews.filter((offer) => offer.id !== offerId);
export const getStarsText = (count: number) => `${count} star${count > 1 ? 's' : ''}`;
export const getStarsTitle = (count: number) => {
  switch (count) {
    case 5:
      return 'perfect';
    case 4:
      return 'good';
    case 3:
      return 'not bad';
    case 2:
      return 'badly';
    case 1:
      return 'terribly';
    default:
      return '';
  }
};


