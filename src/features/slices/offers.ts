import {OfferCardType, OfferType, SortOption} from '../../types/offer.ts';
import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {AppRoute, RequestStatus} from '../../const.tsx';

type OffersState = {
  activeId?: OfferType['id'] | null;
  currentCity: string;
  offers: OfferCardType[];
  sortOption: SortOption;
  status: RequestStatus;
}

const initialState: OffersState = {
  activeId: null,
  currentCity: 'Paris',
  offers: [],
  sortOption: 'Popular',
  status: RequestStatus.Idle,
};

export const loadOffers = createAsyncThunk<OfferCardType[], void, {extra: AxiosInstance}>('fetchOffers/all', async (_arg, {extra: api}) => {
  const response = await api.get<OfferCardType[]>(AppRoute.Offers);
  return response.data;
});

export const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(loadOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(loadOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'offers',
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<OfferType['id'] | undefined>) => {
      state.activeId = action.payload;
    },
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferCardType[]>) => {
      state.offers = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
  }
});

export const {setCurrentCity, setOffers, setSortOption} = offersSlice.actions;

// export const getOffers = () => (dispatch: AppDispatch) => {
//   dispatch(setOffers(offers));
// };

export const selectedSortedOffers = createSelector(
  (state: State) => state.offers.offers,
  (state: State) => state.offers.sortOption,
  (offerCards, sortOption) => {
    switch (sortOption) {
      case 'Price: low to high':
        return [...offerCards].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...offerCards].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...offerCards].sort((a, b) => b.rating - a.rating);
      default:
        return offerCards;
    }
  }
);
