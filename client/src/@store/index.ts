import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { filterReducer } from './filter/reducer';
import { todosReducer } from './todos/reducer';

export const rootReducer = (history: History) =>
  combineReducers({
    todos: todosReducer,
    filter: filterReducer,
    router: connectRouter(history),
  });

export type RootState = ReturnType<typeof rootReducer>;
