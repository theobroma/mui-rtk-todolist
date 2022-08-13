import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TodosAPI } from '../../@api/todos';
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
      state.data = action.payload;
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
      // const apiResponse = await fetch('http://localhost:5000/api/items');
      // const firstRenderData = await apiResponse.json();
      // dispatch(firstRender(firstRenderData));

      const firstRenderData = await TodosAPI.getTodos();
      dispatch(
        firstRender([
          { id: 1, text: 'awesome todo text', completed: null },
          { id: 2, text: 'awesome todo text2', completed: null },
          { id: 3, text: 'awesome todo text3', completed: null },
        ]),
      );
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
      const apiResponse = await fetch(`http://localhost:5000/api/items/${id}`, {
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
      const apiResponse = await fetch(
        `http://localhost:5000/api/items/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        },
      );
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
      const apiResponse = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: false }),
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
