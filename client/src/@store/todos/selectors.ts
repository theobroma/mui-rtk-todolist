import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { filterSelector } from '../filter/selectors';
import { VisibilityFilters, TodoType } from '../../@types';

export const todosSelector = (state: RootState) => {
  return state.todos;
};

export const todosDataSelector = (state: RootState) => {
  return state.todos.data;
};

export const selectVisibleTodos = createSelector(
  [todosDataSelector, filterSelector],
  (todosData, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todosData;
      case VisibilityFilters.SHOW_COMPLETED:
        return todosData.filter((todo: TodoType) => todo.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todosData.filter((todo: TodoType) => !todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  },
);
