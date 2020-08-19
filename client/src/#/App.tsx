import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../@components/Layout';
import { TodoListItem } from '../@components/TodoListItem';
import { TodoList } from '../@components/TodoList';
import { TodoForm } from '../@components/TodoForm';
import { useInputValue } from '../@hooks';
import { createTodoActionCreator } from '../configureStore';

interface Props {}

export const App = (props: Props) => {
  const dispatch = useDispatch();
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();

  const clearInputAndAddTodo = () => {
    clearInput();
    // console.log(inputValue);
    dispatch(createTodoActionCreator({ text: inputValue }));
    // addTodo(inputValue);
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
      {/* <TodoList
        items={todos}
        onItemCheck={idx => checkTodo(idx)}
        onItemRemove={idx => removeTodo(idx)}
      /> */}
      layout
      <TodoList />
      {/* <TodoListItem text="111" />
      <TodoListItem text="222" />
      <TodoListItem text="333" /> */}
    </Layout>
  );
};
