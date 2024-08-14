import {useParams} from 'react-router-dom';
import NotFound from './not-found.tsx';
import OfferContainer from '../components/app/offer-container/offer-container.tsx';
import {OfferCard} from '../components/app/offer-card/offer-card.tsx';
import Map from '../components/app/map/map.tsx';
import {useAppDispatch, useAppSelector} from '../components/app/hooks';
import {useEffect} from 'react';
import {commentsThunks} from '../features/thunks/comments.ts';
import {RequestStatus} from '../const.tsx';
import Loader from '../components/app/loader/loader.tsx';
import {fetchNearby, fetchOffer} from '../features/thunks/offer.ts';
import {OfferType} from '../types/offer.ts';
import Header from '../components/app/header/header.tsx';
import {getNearbyOffers, getOffer, getOffersStatus} from '../features/selectors.ts';

export default function Offer(): JSX.Element {
  const {id: offerId} = useParams();

  const dispatch = useAppDispatch();
  const offerPage = useAppSelector(getOffer);
  const status = useAppSelector(getOffersStatus);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const nearbyOffersWithCurrent = nearbyOffers.slice(0);
  nearbyOffersWithCurrent.push(offerPage as OfferType);

  useEffect(() => {
    Promise.all([
      dispatch(fetchOffer(offerId as string)),
      dispatch(fetchNearby(offerId as string)),
      dispatch(commentsThunks.fetchComments(offerId as string))]);
  }, [fetchOffer, fetchNearby, commentsThunks.fetchComments, offerId]);

  if (status === RequestStatus.Loading) {
    return <Loader />;
  }

  if (status === RequestStatus.Failed || !offerPage) {
    return <NotFound />;
  }

  return (
    <>
      <Header/>
      <div className="page">
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {
                  offerPage.images.map((image) => (
                    <div key={image} className="offer__image-wrapper">
                      <img className="offer__image" src={image} alt="Photo studio"/>
                    </div>
                  ))
                }
              </div>
            </div>
            <OfferContainer offer={offerPage}/>
            <Map offers={nearbyOffersWithCurrent} activeOffer={offerPage} city={offerPage.city}/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearbyOffers.map((offerCard) => (<OfferCard key={offerCard.id} className="near-places" offer={offerCard}/>))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
