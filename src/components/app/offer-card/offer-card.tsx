import {Link} from 'react-router-dom';
import {getMarkupRating, upFirstLetter} from '../../../utils/util.ts';
import FavoriteButton from '../favorite-button/favorite-button.tsx';
import {OfferCardType} from '../../../types/offer.ts';

type OfferCardProps = {
  className: string;
  offer: OfferCardType;
  onHover?: (offer?: OfferCardType) => void;
}

const FAVORITES_CLASS_NAME = 'favorites';

export function OfferCard({className, offer, onHover}: OfferCardProps): JSX.Element {
  const imgWidth = className === FAVORITES_CLASS_NAME ? 150 : 260;
  const imgHeight = className === FAVORITES_CLASS_NAME ? 110 : 200;
  const cardInfoClassName = className === FAVORITES_CLASS_NAME ? 'favorites__card-info' : '';
  const {previewImage, price, isFavorite, rating, title, type} = offer;

  const handleOfferHover = (offerCard: OfferCardType) => {
    if (onHover) {
      onHover(offerCard);
    }
  };

  return (
    <article className={`${className}__card place-card`} onMouseEnter={() => handleOfferHover(offer)}>
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image"/>
        </Link>
      </div>
      <div className={`${cardInfoClassName}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton className="place-card" isFavorite={isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getMarkupRating(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{upFirstLetter(type)}</p>
      </div>
    </article>
  );
}
