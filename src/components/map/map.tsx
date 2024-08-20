import {useEffect, useRef} from 'react';
import useMap from '../hooks/use-map.tsx';
import leaflet, {LayerGroup} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.tsx';
import {CityType, OfferType} from '../../types/offer.ts';

type MapProps = {
  offers: OfferType[];
  activeOffer?: OfferType | null;
  city: CityType;
  isMainMap?: boolean;
}

export default function Map({offers, activeOffer, city, isMainMap}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        if (offer.location) {
          leaflet
            .marker({
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            }, {
              icon: (activeOffer && activeOffer.id === offer.id)
                ? currentCustomIcon
                : defaultCustomIcon,
            })
            .addTo(markerLayer.current);
        }
      });
    }
  }, [map, offers, activeOffer, currentCustomIcon, defaultCustomIcon]);


  return (
    <section
      className="cities__map map"
      style={{height: isMainMap ? 'auto' : '500px'}}
      ref={mapRef}
    >
    </section>
  );
}
