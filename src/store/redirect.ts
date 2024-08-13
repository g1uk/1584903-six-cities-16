import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {reducer} from './index.ts'
import browserHistory from '../browser-history.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'offer/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
