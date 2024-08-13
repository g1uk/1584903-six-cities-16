import Main from '../../pages/main.tsx';
import Favorites from '../../pages/favorites.tsx';
import Offer from '../../pages/offer.tsx';
import Login from '../../pages/login.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './private-route/private-route.tsx';
import NotFound from '../../pages/not-found.tsx';
import {useAppSelector} from './hooks';
import Spinner from './spinner/spinner.tsx';
import {getToken} from '../../services/token.ts';
import {useEffect} from 'react';
import {checkAuth} from '../../features/thunks/auth.ts';

export default function App(): JSX.Element {

  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token, checkAuth]);

  const isAuthChecked = useAppSelector((state) => state.user.status !== AuthorizationStatus.Unknown);

  if (!isAuthChecked) {
    return (
      <Spinner />
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
