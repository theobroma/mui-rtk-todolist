import { FilterType } from '../../@types';
import { RootState } from '..';

export const filterSelector = (state: any) => {
  return state.filter;
};
