import FavoriteEmpty from '../components/app/favorite-empty/favorite-empty.tsx';
import FavoriteContainer from '../components/app/favorite-container/favorite-container.tsx';
import {useAppSelector} from '../components/app/hooks';
import {getFavorites} from '../features/selectors.ts';
import Header from '../components/app/header/header.tsx';
import {Fragment} from 'react';

function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const hasFavorites = favorites.length > 0;
  return (
    <Fragment>
      <Header />
      <div className={`page ${hasFavorites ? '' : 'page--favorites-empty'}`}>
        <main className={`page__main page__main--favorites ${hasFavorites ? '' : 'page__main--favorites-empty'}`}>
          <div className="page__favorites-container container">
            {hasFavorites ? <FavoriteContainer favoriteOfferCards={favorites}/> : <FavoriteEmpty />}
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default Favorites;
