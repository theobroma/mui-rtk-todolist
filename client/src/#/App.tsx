import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../@components/Layout';
import { TodoList } from '../@components/TodoList';
import { TodoForm } from '../@components/TodoForm';
import { useInputValue } from '../@hooks';
import { createTodoActionCreator } from '../@store/todos/slice';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();

  const clearInputAndAddTodo = () => {
    const trimmedText = inputValue.trim();
    if (trimmedText.length > 0) {
      dispatch(createTodoActionCreator({ text: trimmedText }));
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
      <TodoList />
    </Layout>
  );
};
