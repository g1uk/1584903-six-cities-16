import {OfferCardType} from '../types/offer.ts';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute, RequestStatus} from '../const.tsx';
import {OfferCard} from '../components/app/offer-card/offer-card.tsx';
import {useState} from 'react';
import Map from '../components/app/map/map.tsx';
import {useAppDispatch, useAppSelector} from '../components/app/hooks';
import {selectedSortedOffers, setCurrentCity} from '../features/slices/offers.ts';
import {SortOptions} from '../components/app/sort-options/sort-options.tsx';
import Spinner from '../components/app/spinner/spinner.tsx';
import Navigation from '../components/app/navigation/navigation.tsx';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.offers.status);
  const currentCity = useAppSelector((state) => state.offers.currentCity);
  const sortOffers = useAppSelector(selectedSortedOffers);
  const offersByCity = sortOffers.filter((offer) => offer.city.name === currentCity);
  const {pathName} = useLocation() as unknown as {pathName: AppRoute};


  const [activeOffer, setActiveOffer] = useState<OfferCardType | null>(null);

  if (status === RequestStatus.Loading) {
    return <Spinner />;
  }

  const handleOfferHover = (offer?: OfferCardType) => {
    setActiveOffer(offer || null);
  };

  const handleCityChange = (city: string) => {
    dispatch(setCurrentCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <Navigation pathName={pathName} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((cityName) => (
                <li key={cityName} className="locations__item" onClick={() => handleCityChange(cityName)}
                  style={{fontWeight: cityName === currentCity ? 'bold' : 'normal'}}
                >
                  <Link
                    to={AppRoute.Main}
                    className={`locations__item-link tabs__item${currentCity === cityName ? 'tabs__item--active' : ''}`}
                  >
                    <span>{cityName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
              <SortOptions />
              <div className="cities__places-list places__list tabs__content">
                {offersByCity.map((offerCard) => (<OfferCard key={offerCard.id} className='cities' offer={offerCard} onHover={() => handleOfferHover(offerCard)}/>))}
              </div>
            </section>
            <div className="cities__right-section">
              <Map offers={offersByCity} activeOffer={activeOffer} city={offersByCity[0].city} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
