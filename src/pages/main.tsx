import {RequestStatus} from '../const.tsx';
import {useAppSelector} from '../components/app/hooks';
import Loader from '../components/app/loader/loader.tsx';
import MainEmpty from '../components/app/main-empty/main-empty.tsx';
import MainContainer from '../components/app/main-container/main-container.tsx';
import CitiesContainer from '../components/app/cities-container/cities-container.tsx';
import {getCurrentCity, getOffersStatus, selectedSortedOffers} from '../features/selectors.ts';
import Header from '../components/app/header/header.tsx';


function Main(): JSX.Element {
  const status = useAppSelector(getOffersStatus);
  const currentCity = useAppSelector(getCurrentCity);
  const sortOffers = useAppSelector(selectedSortedOffers);
  const offersByCity = sortOffers.filter((offer) => offer.city.name === currentCity);

  if (status === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${offersByCity.length ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesContainer currentCity={currentCity} />
        </div>
        <div className="cities">
          {offersByCity.length
            ? <MainContainer offersByCity={offersByCity} currentCity={currentCity} />
            : <MainEmpty currentCity={currentCity}/>}
        </div>
      </main>
    </div>
  );
}

export default Main;
