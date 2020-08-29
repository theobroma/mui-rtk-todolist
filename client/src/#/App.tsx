import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../@components/Layout';
import { TodoList } from '../@components/TodoList';
import { TodoForm } from '../@components/TodoForm';
import { useInputValue } from '../@hooks';
import {
  createTodoActionCreator,
  createTodoAsync,
} from '../@store/todos/slice';
import LoadingPage from '../@components/UI/LoadingPage';
import { todosSelector } from '../@store/todos/selectors';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(todosSelector);
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();

  const clearInputAndAddTodo = () => {
    const trimmedText = inputValue.trim();
    if (trimmedText.length > 0) {
      // dispatch(createTodoActionCreator({ text: trimmedText }));
      dispatch(createTodoAsync(trimmedText));
    }
    clearInput();
  };

  return (
    <Layout>
      <TodoForm
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event: KeyboardEvent) =>
          keyInput(event, clearInputAndAddTodo)
        }
      />
      {loading ? <LoadingPage /> : <TodoList />}
    </Layout>
  );
};
