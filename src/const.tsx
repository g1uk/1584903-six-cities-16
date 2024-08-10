export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Comments = '/comments',
  Offers = '/offers',
  Offer = '/offer/:id'
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

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const AUTH_TOKEN_KEY = 'six-cities';
