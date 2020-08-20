import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../@components/Layout';
import { TodoList } from '../@components/TodoList';
import { TodoForm } from '../@components/TodoForm';
import { useInputValue } from '../@hooks';
import { createTodoActionCreator } from '../configureStore';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();

  const clearInputAndAddTodo = () => {
    clearInput();
    dispatch(createTodoActionCreator({ text: inputValue }));
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
      <TodoList />
    </Layout>
  );
};
