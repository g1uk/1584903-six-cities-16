import {useLocation} from 'react-router-dom';
import Navigation from '../navigation/navigation.tsx';
import Logo from '../logo/logo.tsx';

export default function Header(): JSX.Element {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <Navigation pathName={location.pathname} />
        </div>
      </div>
    </header>
  );
}
