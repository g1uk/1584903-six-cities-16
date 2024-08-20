import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import 'leaflet/dist/leaflet.css';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuth} from './features/auth-thunk/auth-thunk.ts';
import {fetchOffers} from './features/offers-thunk/offers-thunk.ts';
import {fetchFavorites} from './features/favorites-thunk/favorites-thunk.ts';

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
