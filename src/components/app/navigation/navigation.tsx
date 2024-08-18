import {AppRoute} from '../../../const.tsx';
import {useAuth} from '../hooks/use-auth.tsx';
import {Link} from 'react-router-dom';
import LoggedNavigation from '../logged-navigation/logged-navigation.tsx';

type NavigationProps = {
  pathName: string;
}

export default function Navigation({pathName}: NavigationProps) {
  const location = pathName;
  const loginLink: string = AppRoute.Login;
  const isLoginPage = loginLink === location;
  const isAuthorized = useAuth();

  if (isLoginPage) {
    return <nav className="header__nav"></nav>;
  }

  return (
    <nav className="header__nav">
      {isAuthorized ? (
        <LoggedNavigation />
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
