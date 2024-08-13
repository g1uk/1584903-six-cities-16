import {useParams} from 'react-router-dom';
import NotFound from './not-found.tsx';
import OfferContainer from '../components/app/offer-container/offer-container.tsx';
import {OfferCard} from '../components/app/offer-card/offer-card.tsx';
import Map from '../components/app/map/map.tsx';
import {useAppDispatch, useAppSelector} from '../components/app/hooks';
import {useEffect, useState} from 'react';
import {commentsThunks} from '../features/thunks/comments.ts';
import {RequestStatus} from '../const.tsx';
import Spinner from '../components/app/spinner/spinner.tsx';
import {OfferCardType} from '../types/offer.ts';
import {fetchNearby, fetchOffer} from '../features/thunks/offer.ts';

export default function Offer(): JSX.Element {
  const {id: offerId} = useParams();

  const dispatch = useAppDispatch();
  const offerPage = useAppSelector((state) => state.offer.info);
  const status = useAppSelector((state) => state.offer.status);
  const nearbyOffers = useAppSelector((state) => state.offer.nearby);

  const [activeOffer, setActiveOffer] = useState<OfferCardType | null>(null);

  const handleOfferHover = (offer?: OfferCardType) => {
    setActiveOffer(offer || null);
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchOffer(offerId as string)),
      dispatch(fetchNearby(offerId as string)),
      dispatch(commentsThunks.fetchComments(offerId as string))]);
  }, [fetchOffer, fetchNearby, commentsThunks.fetchComments, offerId]);

  if (status === RequestStatus.Loading) {
    return <Spinner />;
  }

  if (status === RequestStatus.Failed || !offerPage) {
    return <NotFound />;
  }

  return (
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
          <OfferContainer offer={offerPage} />
          <Map offers={nearbyOffers} activeOffer={activeOffer} city={offerPage.city} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offerCard) => <OfferCard key={offerCard.id} className='near-places' offer={offerCard} onHover={() => handleOfferHover(offerCard)} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
