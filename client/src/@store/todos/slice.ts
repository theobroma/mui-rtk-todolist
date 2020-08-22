import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TodoListType, TodoType } from '../../@types';

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

export const todosSlice = createSlice({
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
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; completed: boolean }>,
    ) => {
      const index = state.data.findIndex(
        (todo: TodoType) => todo._id === payload.id,
      );
      if (index !== -1) {
        state.data[index].completed = payload.completed;
      }
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.data.findIndex((todo) => todo._id === payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});

export const {
  create: createTodoActionCreator,
  // edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator,
} = todosSlice.actions;
