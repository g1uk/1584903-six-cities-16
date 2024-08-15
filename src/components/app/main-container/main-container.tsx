import {SortOptions} from '../sort-options/sort-options.tsx';
import {OfferCard} from '../offer-card/offer-card.tsx';
import Map from '../map/map.tsx';
import {OfferType} from '../../../types/offer.ts';
import {useState} from 'react';

type MainContainerProps = {
  offersByCity: OfferType[];
  currentCity: string;
}

export default function MainContainer ({offersByCity, currentCity}: MainContainerProps) {
  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  const handleOfferHover = (offer?: OfferType) => {
    setActiveOffer(offer || null);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
        <SortOptions/>
        <div className="cities__places-list places__list tabs__content">
          {offersByCity.map((offerCard) => (<OfferCard key={offerCard.id} className='cities' offer={offerCard} onHover={() => handleOfferHover(offerCard)}/>))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map offers={offersByCity} activeOffer={activeOffer} city={offersByCity[0].city}/>
      </div>
    </div>
  );
}
