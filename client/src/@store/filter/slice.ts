import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType } from '../../@types';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: 'SHOW_ALL' as FilterType,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<{ filter: FilterType }>) =>
      payload.filter,
  },
});

export const { setFilter: setFilterActionCreator } = filterSlice.actions;
