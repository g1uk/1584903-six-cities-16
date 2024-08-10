import {UserType} from './user-type.ts';

const AVATAR_URL = 'https://i.pravatar.cc/128';

export type Review = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
}

export const getRandomAvatar = `${AVATAR_URL}?rnd=${Math.random()}`;
export const getReviewsByOfferId = (reviews: Review[], offerId: string | undefined) => reviews.filter((offer) => offer.id !== offerId).slice(0, 10);
export const getStarsText = (count: number) => `${count} star${count > 1 ? 's' : ''}`;


