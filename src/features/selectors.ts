import {createDraftSafeSelector, createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';
import {AuthorizationStatus} from '../const.tsx';

const selectSafe = (state: State) => state;
export const getOffersStatus = createDraftSafeSelector(selectSafe, (state) => state.offers.status);
export const getNearbyOffers = createDraftSafeSelector(selectSafe, (state) => state.offer.nearby.slice(0, 3));
export const getOffersSortOption = createDraftSafeSelector(selectSafe, (state) => state.offers.sortOption);
export const getOffer = createDraftSafeSelector(selectSafe, (state) => state.offer.info);
export const getCurrentCity = createDraftSafeSelector(selectSafe, (state) => state.offers.currentCity);
export const isUserAuthorized = createDraftSafeSelector(selectSafe, (state) => state.user.status !== AuthorizationStatus.Unknown);
export const getUserStatus = createDraftSafeSelector(selectSafe, (state) => state.user.status);
export const getUser = createDraftSafeSelector(selectSafe, (state) => state.user.info);
export const getFavorites = createDraftSafeSelector(selectSafe, (state) => state.favorites.items);
export const getReviews = createDraftSafeSelector(selectSafe, (state) => state.reviews.items);

export const selectedSortedOffers = createSelector(
  (state: State) => state.offers.offers,
  (state: State) => state.offers.sortOption,
  (offerCards, sortOption) => {
    switch (sortOption) {
      case 'Price: low to high':
        return [...offerCards].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...offerCards].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...offerCards].sort((a, b) => b.rating - a.rating);
      default:
        return offerCards;
    }
  }
);
