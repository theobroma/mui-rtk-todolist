import { combineReducers } from 'redux';
import { todosSlice } from './todos/slice';
import { filterSlice } from './filter/slice';

export const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
