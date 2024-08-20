import * as classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../hooks';
import {changeFavorite} from '../../features/favorites-thunk/favorites-thunk.ts';
import {updateOffers} from '../../features/offers-slice/offers-slice.ts';
import {updateOffer} from '../../features/offer-slice/offer-slice.ts';
import {AppRoute} from '../../const.tsx';
import {useNavigate} from 'react-router-dom';
import {isUserAuthorized} from '../../features/selectors/selectors.ts';

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
  const navigate = useNavigate();
  const isUserAuth = useAppSelector(isUserAuthorized);
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
    if (!isUserAuth) {
      return navigate(AppRoute.Login);
    }
    dispatch(changeFavorite({
      offerId,
      status: Number(!isFavorite)
    })).unwrap().then(() => {
      dispatch(updateOffer(offerId));
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
