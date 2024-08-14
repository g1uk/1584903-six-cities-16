import {AppRoute, AuthorizationStatus} from '../../../const.tsx';
import {Location, Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import Loader from '../loader/loader.tsx';
import {getUser, getUserStatus} from '../../../features/selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

type FromState = {
  from?: Location;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, onlyUnAuth} = props;
  const location: Location<FromState> = useLocation() as Location<FromState>;

  const user = useAppSelector(getUser);
  const userCheckAuth = useAppSelector(getUserStatus);

  if (userCheckAuth === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || {pathname: AppRoute.Main};
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate state={{from: location}} to={AppRoute.Login} />;
  }

  return children;
}
