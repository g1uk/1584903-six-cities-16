import * as classNames from 'classnames';
import {useAppDispatch} from '../hooks';
import {changeFavorite} from '../../../features/thunks/favorites.ts';
import {updateOffers} from '../../../features/slices/offers.ts';
import {offerSlice} from '../../../features/slices/offer.ts';

type FavoriteButtonProps = {
  className?: 'offer' | 'place-card';
  isFavorite?: boolean;
  offerId: string;
  width?: number;
}

const enum Default {
  HeightCoefficient = 18 / 17
}

export default function FavoriteButton ({className = 'place-card',
  isFavorite = false, offerId, width = 18}: FavoriteButtonProps) {

  const dispatch = useAppDispatch();
  const favoriteLabel = `${isFavorite ? 'In' : 'To'} bookmarks`;
  const buttonClass = `${className}__bookmark-button`;
  const favoriteClass = classNames(
    buttonClass,
    {
      [`${buttonClass}--active`]: isFavorite
    },
    'button'
  );

  const height = width * Default.HeightCoefficient;

  function handleClick() {
    dispatch(changeFavorite({
      offerId,
      status: Number(!isFavorite)
    })).unwrap().then(() => {
      dispatch(offerSlice.actions.updateOffer(offerId));
      dispatch(updateOffers(offerId));
    });
  }

  return (
    <button className={favoriteClass} onClick={handleClick} type="button">
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{favoriteLabel}</span>
    </button>
  );
}
