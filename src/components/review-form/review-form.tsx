import {FormEvent, Fragment, useState} from 'react';
import * as React from 'react';
import {getStarsText, getStarsTitle} from '../../types/review-type.ts';
import {useAppDispatch} from '../hooks';
import {postComment} from '../../features/comments-thunk/comments-thunk.ts';
import {OfferType} from '../../types/offer.ts';
import {MAX_CHARACTERS, MIN_CHARACTERS} from '../../const.tsx';

const NUMBERS = [5, 4, 3, 2, 1];

type HTMLCommentForm = HTMLFormElement & {
  rating: HTMLInputElement;
  comment: HTMLInputElement;
}

type ReviewFormProps = {
  offerId: OfferType['id'];
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [count, setCount] = useState(MIN_CHARACTERS);
  const dispatch = useAppDispatch();
  let isDisabled = false;

  const onRatingChange = (evt: React.FormEvent) => {
    if (evt.target instanceof HTMLInputElement) {
      setRating(Number(evt.target.value));
    }
  };
  const onTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    setCount(MIN_CHARACTERS - evt.target.value.length);
  };

  function handleSubmit(event: FormEvent<HTMLCommentForm>) {
    event.preventDefault();
    isDisabled = true;
    dispatch(postComment({body: {
      rating: rating,
      comment: comment
    }, offerId})).then(() => {
      isDisabled = false;
      setComment('');
      setRating(0);
    }).catch(() => {
      isDisabled = false;
    });
  }

  return (
    <form className="reviews__form form" action="#" onSubmit={handleSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div
        className="reviews__rating-form form__rating"
      >
        {NUMBERS.map((num) => (
          <Fragment key={num}>
            <input className="form__rating-input visually-hidden" name="rating" value={num} id={getStarsText(num)} type="radio" onChange={onRatingChange} checked={num === rating} disabled={isDisabled}/>
            <label htmlFor={getStarsText(num)} className="reviews__rating-label form__rating-label" title={getStarsTitle(num)}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onTextChange}
        maxLength={MAX_CHARACTERS}
        minLength={MIN_CHARACTERS}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{count > 0 ? count : 0} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || comment.length < MIN_CHARACTERS || rating === 0}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
