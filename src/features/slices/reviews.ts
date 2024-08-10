import {createSlice} from '@reduxjs/toolkit';
import {Review} from '../../types/review-type.ts';
import {RequestStatus} from '../../const.tsx';
import {commentsThunks} from '../thunks/comments.ts';

type ReviewsState = {
  items: Review[];
  status: RequestStatus;
}

const initialState: ReviewsState = {
  items: [],
  status: RequestStatus.Idle
};

export const reviewSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(commentsThunks.fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(commentsThunks.fetchComments.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(commentsThunks.fetchComments.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(commentsThunks.postComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(commentsThunks.postComment.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(commentsThunks.postComment.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'reviews',
  reducers: {}
});
