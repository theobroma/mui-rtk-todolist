import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TodoListType, TodoType } from '../../@types';

export const todosInitialState: TodoListType = {
  data: [
    // {
    //   id: uuidv4(),
    //   text: 'Learn React',
    //   completed: true,
    // },
    // {
    //   id: uuidv4(),
    //   text: 'Learn Redux',
    //   completed: true,
    // },
    // {
    //   id: uuidv4(),
    //   text: 'Learn Redux-ToolKit',
    //   completed: false,
    // },
  ],
  editingTodoId: null,
  editingTodoTitle: '',
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    firstRender(state, action) {
      // const { count, next, results } = action.payload;
      const { todos } = action.payload;
      state.data = todos;
    },
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; text: string; completed: boolean }>,
      ) => {
        state.data.push(payload);
      },
      prepare: ({ text }: { text: string }) => ({
        payload: {
          id: uuidv4(),
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
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; completed: boolean }>,
    ) => {
      const index = state.data.findIndex(
        (todo: TodoType) => todo.id === payload.id,
      );
      if (index !== -1) {
        state.data[index].completed = payload.completed;
      }
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.data.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    removeCompleted: (state, action) => {
      state.data = state.data.filter((todo: TodoType) => !todo.completed);
    },
    // SOME SEARCH REDUCER SHOULD GO HERE
    apiError(state, action) {
      const { message } = action.payload;
      alert(message);
    },
  },
});

export const {
  create: createTodoActionCreator,
  // edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator,
  removeCompleted: removeCompletedActionCreator,
  setLoading,
  firstRender,
  apiError,
} = todosSlice.actions;

// API REQUEST ACTIONS HANDLED WITH REDUX-THUNK MIDDLEWARE BUILT INTO REDUX TOOLKIT -->

/* **************THUNKS************** */

export const getFirstRender = () => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    // redux-thunk
    try {
      const apiResponse = await fetch('/api/todos');
      const firstRenderData = await apiResponse.json();
      dispatch(firstRender(firstRenderData));
    } catch (e) {
      apiError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const removeTodoAsyncById = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    // redux-thunk
    try {
      const apiResponse = await fetch(`/api/todos/${id}`, {
        method: 'delete',
      });
      const json = await apiResponse.json();
      console.log(json);
      // refetch
      dispatch(getFirstRender());
    } catch (e) {
      apiError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const saveTodoAsync = (todo: TodoType) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    // redux-thunk
    try {
      const apiResponse = await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(todo),
      });
      const json = await apiResponse.json();
      console.log(json);
      // refetch
      dispatch(getFirstRender());
    } catch (e) {
      apiError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createTodoAsync = (text: string) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    // redux-thunk
    try {
      const apiResponse = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(text),
      });
      const json = await apiResponse.json();
      // refetch
      dispatch(getFirstRender());
    } catch (e) {
      apiError(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
