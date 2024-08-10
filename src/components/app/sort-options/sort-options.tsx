import {useAppDispatch, useAppSelector} from '../hooks';
import {setSortOption} from '../../../features/slices/offers.ts';
import {useState} from 'react';
import {SortOption} from '../../../types/offer.ts';

const sortingTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
] as const;

export const SortOptions = () => {
  const dispatch = useAppDispatch();
  const sortOption = useAppSelector((state) => state.offers.sortOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSortChange = (sort: SortOption) => {
    dispatch(setSortOption(sort));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleChangeIsOpen}>
        {sortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options--${isOpen ? 'opened' : 'closed'}`}>
        {sortingTypes.map((sort) => (
          <li key={sort}
            onClick={() => handleSortChange(sort)}
            className={`places__option ${sortOption === sort ? 'places__option--active' : ''}`}
            tabIndex={0}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
};
