import {AppRoute, AuthorizationStatus} from '../../../const.tsx';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import Loader from '../loader/loader.tsx';
import {getUser, getUserStatus} from '../../../features/selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, onlyUnAuth} = props;
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const userCheckAuth = useAppSelector(getUserStatus);

  if (userCheckAuth === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  if (onlyUnAuth && user) {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    }
    return <Navigate to={AppRoute.Main} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={AppRoute.Login} />;
  }

  return children;
}
