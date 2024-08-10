import {UserType} from './user-type.ts';

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityType = {
  name: string;
  location: LocationType;
}

type OfferTemplateType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type OfferCardType = OfferTemplateType & {
  previewImage: string;
};

export type OfferType = OfferCardType & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserType;
  images: string[];
  maxAdults: number;
};

export type SortOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export const getFavoriteOfferCards = (offers: OfferCardType[]) => offers.filter((offerCard) => offerCard.isFavorite);
export const getNearOfferCardsById = (offers: OfferType[], offerId: string | undefined) => offers.filter((offer) => offer.id !== offerId).slice(0, 3);
export const getOfferById = (offers: OfferType[], offerId: string | undefined) => offers.find((offer) => offer.id === offerId);
