import {OfferType} from '../../../types/offer.ts';
import FavoriteButton from '../favorite-button/favorite-button.tsx';
import {getMarkupRating, upFirstLetter} from '../../../utils/util.ts';
import {getAdultsString, getBedroomsString} from './util.ts';
import ReviewList from '../review-list/review-list.tsx';

type OfferContainerProps = {
  offer: OfferType;
}

export default function OfferContainer({offer}: OfferContainerProps) {
  const {isPremium, title, isFavorite, rating, type, bedrooms,
    maxAdults, price, goods, host, description} = offer;

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {isPremium ? (
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        ) : null}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {title}
          </h1>
          <FavoriteButton className="offer" isFavorite={isFavorite} offerId={offer.id}/>
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={getMarkupRating(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{rating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {upFirstLetter(type)}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {getBedroomsString(bedrooms)}
          </li>
          <li className="offer__feature offer__feature--adults">
            {getAdultsString(maxAdults)}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {goods.map((goodsItem) => (
              <li key={goodsItem} className="offer__inside-item">
                {goodsItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className={`offer__avatar-wrapper${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
              <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
            </div>
            <span className="offer__user-name">
              {host.name}
            </span>
            {host.isPro ? (
              <span className="offer__user-status">
                    Pro
              </span>
            ) : null}
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {description}
            </p>
          </div>
        </div>
        <ReviewList offerId={offer.id}/>
      </div>
    </div>
  );
}
