import Main from '../../pages/main.tsx';
import Favorites from '../../pages/favorites.tsx';
import Offer from '../../pages/offer.tsx';
import Login from '../../pages/login.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './private-route/private-route.tsx';
import NotFound from '../../pages/not-found.tsx';
import {getFavoriteOfferCards} from '../../types/offer.ts';
import {useAppSelector} from './hooks';

export default function App(): JSX.Element {

  const offers = useAppSelector((state) => state.offers.offers);
  console.log(offers)
  const favoriteOfferCards = getFavoriteOfferCards(offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites favoriteOfferCards={favoriteOfferCards}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
