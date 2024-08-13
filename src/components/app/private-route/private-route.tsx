import {AppRoute, AuthorizationStatus} from '../../../const.tsx';
import {Location, Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import Spinner from '../spinner/spinner.tsx';

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

  const user = useAppSelector((state) => state.user.info);
  const userCheckAuth = useAppSelector((state) => state.user.status);

  if (userCheckAuth === AuthorizationStatus.Unknown) {
    return <Spinner />;
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
