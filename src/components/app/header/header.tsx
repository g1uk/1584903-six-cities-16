import {Outlet, useLocation} from 'react-router-dom';
import {AppRoute} from '../../../const.tsx';
import Navigation from '../navigation/navigation.tsx';
import Logo from '../logo/logo.tsx';

export default function Header(): JSX.Element {
  const {pathName} = useLocation() as unknown as {pathName: AppRoute};

  const classPage = {
    [AppRoute.Favorites]: '',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Main]: 'page--gray page--main',
    [AppRoute.NotFound]: '',
    [AppRoute.Offer]: '',
    [AppRoute.Comments]: '',
    [AppRoute.Offers]: '',
    [AppRoute.Favorite]: ''
  };

  return (
    <div className={`page ${classPage[pathName]}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Navigation pathName={pathName} />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
