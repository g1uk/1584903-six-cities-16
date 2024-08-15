import {Review} from '../../../types/review-type.ts';
import {getMarkupRating} from '../../../utils/util.ts';
import {getAttributeDate, getMarkUpDate} from './util.ts';

type ReviewItemProps = {
  review: Review;
}

export default function ReviewItem ({review}: ReviewItemProps) {
  const {user, rating, comment, date} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getMarkupRating(rating)}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={getAttributeDate(date)}>{getMarkUpDate(date)}</time>
      </div>
    </li>
  );
}
