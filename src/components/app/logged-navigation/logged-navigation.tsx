import {useAppDispatch, useAppSelector} from '../hooks';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.tsx';
import {logout} from '../../../features/thunks/auth.ts';

export default function LoggedNavigation() {
  const user = useAppSelector((state) => state.user.info);
  const favoriteOffers = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{user?.email}</span>
          <span className="header__favorite-count">{favoriteOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" onClick={() => {
          dispatch(logout());
        }} to="#"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}
