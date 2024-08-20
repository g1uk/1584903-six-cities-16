import {UserType} from '../../types/user-type.ts';
import {AuthorizationStatus, RequestStatus} from '../../const.tsx';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkAuth, login, logout} from '../auth-thunk/auth-thunk.ts';

type UserState = {
  info: UserType | null;
  requestStatus: RequestStatus;
  status: AuthorizationStatus;
};

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  status: AuthorizationStatus.Unknown
};

function processSuccess(state: UserState, action: PayloadAction<UserType>) {
  state.info = action.payload;
  state.requestStatus = RequestStatus.Success;
  state.status = AuthorizationStatus.Auth;
}

function processFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
  state.status = AuthorizationStatus.NoAuth;
}

function processLoading(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
}

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, processSuccess);
    builder.addCase(checkAuth.rejected, processFailed);
    builder.addCase(checkAuth.pending, processLoading);
    builder.addCase(login.fulfilled, processSuccess);
    builder.addCase(login.rejected, processFailed);
    builder.addCase(login.pending, processLoading);
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.status = AuthorizationStatus.NoAuth;
    });
  },
  initialState,
  name: 'user',
  reducers: {}
});
