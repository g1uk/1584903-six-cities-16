export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Favorite = '/favorite',
  Comments = '/comments',
  Offers = '/offers',
  Offer = '/offer/:id',
  NotFound = '/not-found'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export const enum FavoriteStatus {
  Added = 1,
  Removed = 0,
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const AUTH_TOKEN_KEY = 'six-cities';
export const MIN_CHARACTERS = 50;
export const MAX_CHARACTERS = 300;
