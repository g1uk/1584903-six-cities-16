import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuth} from './features/thunks/auth.ts';
import {fetchOffers} from './features/thunks/offers.ts';
import {fetchFavorites} from './features/thunks/favorites.ts';

store.dispatch(fetchOffers());
store.dispatch(fetchFavorites());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
