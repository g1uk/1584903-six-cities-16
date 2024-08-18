import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.tsx';
import {useAppDispatch} from '../hooks';
import {setCurrentCity} from '../../../features/slices/offers.ts';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

type CitiesContainerProps = {
  currentCity: string;
}

export default function CitiesContainer ({currentCity}: CitiesContainerProps) {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(setCurrentCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((cityName) => (
          <li key={cityName} className="locations__item" onClick={() => handleCityChange(cityName)}
            style={{fontWeight: cityName === currentCity ? 'bold' : 'normal'}}
          >
            <Link
              to={AppRoute.Main}
              className={`locations__item-link tabs__item ${currentCity === cityName ? 'tabs__item--active' : ''}`}
            >
              <span>{cityName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
