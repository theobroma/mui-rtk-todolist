import { createReducer } from 'typesafe-actions';
import { SET_FILTER } from './constants';
import { FilterActionType } from './actions';
import { FilterType } from '../../@types';

export const filterInitialState = 'SHOW_ALL' as FilterType;
export type FilterStateType = typeof filterInitialState;

export const filterReducer = createReducer<FilterStateType, FilterActionType>(
  filterInitialState,
  {
    [SET_FILTER]: (state, { payload: filter }) => {
      return filter;
    },
  },
);
