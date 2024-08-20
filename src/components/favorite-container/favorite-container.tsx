import {OfferType} from '../../types/offer.ts';
import {getOfferCardsByCity} from '../../utils/util.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.tsx';
import {OfferCard} from '../offer-card/offer-card.tsx';

type FavoriteContainerProps = {
  favoriteOfferCards: OfferType[];
}

export default function FavoriteContainer ({favoriteOfferCards}: FavoriteContainerProps) {
  const offerCardsByCity = getOfferCardsByCity(favoriteOfferCards);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offerCardsByCity).map(([cityName, offerCards]) => (
          <li key={cityName} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.Main}>
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offerCards.map((offerCard) => <OfferCard key={offerCard.id} className='favorites' offer={offerCard} />)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
