import React, { memo } from 'react';
import { List, Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import { TodoListItem } from './TodoListItem';
import { todosSelector } from '../@store/todos/selectors';
import { TodoType } from '../@types';

interface Props {}

export const TodoList: React.FC<Props> = memo((props) => {
  const { data: todos, editingTodoId } = useSelector(todosSelector);
  return (
    <>
      {todos.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {todos.map((todo: TodoType, idx: number) => (
              <TodoListItem
                todo={todo}
                key={shortid.generate()}
                // no divider for last item
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
