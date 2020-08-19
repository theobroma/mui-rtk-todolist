import {
  combineReducers,
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserHistory } from 'history';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { routerMiddleware } from 'connected-react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { rootReducer } from './@store/index';
import { TodoListType, TodoType } from './@types';

export const history = createBrowserHistory();

export const todosInitialState: TodoListType = {
  data: [
    {
      _id: uuidv4(),
      text: 'Learn React',
      completed: true,
    },
    {
      _id: uuidv4(),
      text: 'Learn Redux',
      completed: true,
    },
    {
      _id: uuidv4(),
      text: 'Learn Redux-ToolKit',
      completed: false,
    },
  ],
  editingTodoId: null,
  editingTodoTitle: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ _id: string; text: string; completed: boolean }>,
      ) => {
        state.data.push(payload);
      },
      prepare: ({ text }: { text: string }) => ({
        payload: {
          _id: uuidv4(),
          text,
          completed: false,
        },
      }),
    },
    // edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
    //   const index = state.findIndex((todo) => todo.id === payload.id);
    //   if (index !== -1) {
    //     state[index].desc = payload.desc;
    //   }
    // },
    // toggle: (
    //   state,
    //   { payload }: PayloadAction<{ id: string; isComplete: boolean }>,
    // ) => {
    //   const index = state.findIndex((todo) => todo.id === payload.id);
    //   if (index !== -1) {
    //     state[index].isComplete = payload.isComplete;
    //   }
    // },
    // remove: (state, { payload }: PayloadAction<{ id: string }>) => {
    //   const index = state.findIndex((todo) => todo.id === payload.id);
    //   if (index !== -1) {
    //     state.splice(index, 1);
    //   }
    // },
  },
});

export const {
  create: createTodoActionCreator,
  // edit: editTodoActionCreator,
  // toggle: toggleTodoActionCreator,
  // remove: deleteTodoActionCreator,
} = todosSlice.actions;

// const selectedTodoSlice = createSlice({
//   name: 'selectedTodo',
//   initialState: null as string | null,
//   reducers: {
//     select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
//   },
// });

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  // selectedTodo: selectedTodoSlice.reducer,
  // counter: counterSlice.reducer,
});

const logger = createLogger({
  collapsed: true,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['router'], // will not be persisted
  whitelist: ['todos'], // will be persisted
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = [...getDefaultMiddleware(), logger];
// https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
  devTools: true,
});

export const persistor = persistStore(store);
export default { store, persistor };

// const configureStore = () => {
//   const persistConfig = {
//     key: 'root',
//     storage,
//     // blacklist: ['router'], // will not be persisted
//     // Persist just 'auth' reducer data
//     whitelist: ['todos', 'filter'],
//   };

//   const pReducer = persistReducer(persistConfig, rootReducer(history));

//   const logger = createLogger({
//     collapsed: true,
//   });

//   const middlewares = [thunk, logger, routerMiddleware(history)];

//   const composeEnhancers = composeWithDevTools({
//     // Specify here name, actionsBlacklist, actionsCreators and other options
//   });

//   const store = createStore(
//     pReducer,
//     composeEnhancers(applyMiddleware(...middlewares)),
//   );

//   return store;
// };

// export const store = configureStore();

// export const persistor = persistStore(store);

// export default { store, persistor };
