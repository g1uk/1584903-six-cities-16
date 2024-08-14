import Main from '../../pages/main.tsx';
import Favorites from '../../pages/favorites.tsx';
import Offer from '../../pages/offer.tsx';
import Login from '../../pages/login.tsx';
import {AppRoute} from '../../const.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './private-route/private-route.tsx';
import NotFound from '../../pages/not-found.tsx';
import {useAppSelector} from './hooks';
import Loader from './loader/loader.tsx';
import {getToken} from '../../services/token.ts';
import {useEffect} from 'react';
import {checkAuth} from '../../features/thunks/auth.ts';
import {isUserAuthorized} from '../../features/selectors.ts';

export default function App(): JSX.Element {

  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token, checkAuth]);

  const isAuthChecked = useAppSelector(isUserAuthorized);

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
