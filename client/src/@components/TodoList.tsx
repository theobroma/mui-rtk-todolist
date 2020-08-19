import React, { memo } from 'react';
import { List, Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import { TodoListItem } from './TodoListItem';
import { todosSelector } from '../@store/todos/selectors';

interface Props {}

export const TodoList: React.FC<Props> = memo((props) => {
  const { data: todos, editingTodoId } = useSelector(todosSelector);
  return (
    <>
      {todos.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {todos.map((todo: any, idx: number) => (
              <TodoListItem
                {...todo}
                key={shortid.generate()}
                divider={idx !== todos.length - 1}
                // onButtonClick={() => props.onItemRemove(idx)}
                // onCheckBoxToggle={() => props.onItemCheck(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
});
