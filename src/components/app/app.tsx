import Main from '../../pages/main/main.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Offer from '../../pages/offer/offer.tsx';
import Login from '../../pages/login/login.tsx';
import {AppRoute} from '../../const.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.tsx';
import NotFound from '../../pages/not-found/not-found.tsx';
import {useAppSelector} from '../hooks';
import Loader from '../loader/loader.tsx';
import {getToken} from '../../services/token.ts';
import {useEffect} from 'react';
import {checkAuth} from '../../features/auth-thunk/auth-thunk.ts';
import {isUserCheckAuth} from '../../features/selectors/selectors.ts';

export default function App(): JSX.Element {

  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token]);

  const isAuthChecked = useAppSelector(isUserCheckAuth);

  if (!isAuthChecked) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute onlyUnAuth>
              <Login/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
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
