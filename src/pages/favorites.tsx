import {MainOffers} from '../types/offer.ts';
import OfferList from '../app/offer-list.tsx';

type FavoritesOfferProps = {
  offers: MainOffers;
}

function Favorites({offers}: FavoritesOfferProps): JSX.Element {
  const amsterdamList = offers.filter((of) => of.isFavourite && of.city === 'Amsterdam');
  const cologneList = offers.filter((of) => of.isFavourite && of.city === 'Cologne');
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <OfferList list={amsterdamList}/>
              </div>
            </li>

            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Cologne</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <OfferList list={cologneList}/>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
