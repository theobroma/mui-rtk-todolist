import { ActionType, createAction } from 'typesafe-actions';
import { SET_FILTER } from './constants';
import { FilterType } from '../../@types';

export const setFilter = createAction(SET_FILTER)<FilterType>();

export const actions = {
  setFilter,
};

export type FilterActionType = ActionType<typeof actions>;
