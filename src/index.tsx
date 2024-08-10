import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {loadOffers} from './features/slices/offers.ts';

store.dispatch(loadOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
