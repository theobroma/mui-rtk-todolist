import React from 'react';
import Layout from '../@components/Layout';
import { TodoListItem } from '../@components/TodoListItem';
import { TodoList } from '../@components/TodoList';
import { TodoForm } from '../@components/TodoForm';

interface Props {}

export const App = (props: Props) => {
  return (
    <Layout>
      <TodoForm />
      {/* <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={event => keyInput(event, clearInputAndAddTodo)}
      />
      <TodoList
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
