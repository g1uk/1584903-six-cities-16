import FavoriteEmpty from '../../components/favorite-empty/favorite-empty.tsx';
import FavoriteContainer from '../../components/favorite-container/favorite-container.tsx';
import {useAppSelector} from '../../components/hooks';
import {getFavorites} from '../../features/selectors/selectors.ts';
import Header from '../../components/header/header.tsx';

function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const hasFavorites = favorites.length > 0;
  return (
    <div className={`page ${hasFavorites ? '' : 'page--favorites-empty'}`}>
      <Header />
      <main className={`page__main page__main--favorites ${hasFavorites ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {hasFavorites ? <FavoriteContainer favoriteOfferCards={favorites}/> : <FavoriteEmpty />}
        </div>
      </main>
    </div>
  );
}

export default Favorites;
