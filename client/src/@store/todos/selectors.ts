import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { filterSelector } from '../filter/selectors';
import { VisibilityFilters, TodoType } from '../../@types';

export const todosSelector = (state: any) => {
  return state.todos;
};

export const selectVisibleTodos = createSelector(
  [todosSelector, filterSelector],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo: TodoType) => todo.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo: TodoType) => !todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  },
);
