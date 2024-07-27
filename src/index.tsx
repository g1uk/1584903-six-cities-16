import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {offers} from './mocks/offers.tsx';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App
    offers={offers}
  />
);
