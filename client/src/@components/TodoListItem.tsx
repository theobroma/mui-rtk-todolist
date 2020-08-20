import React, { memo } from 'react';

import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { useDispatch } from 'react-redux';
import { TodoType } from '../@types';
import {
  deleteTodoActionCreator,
  toggleTodoActionCreator,
} from '../configureStore';

interface Props {
  todo: TodoType;
  divider?: any;
}

export const TodoListItem: React.FC<Props> = memo(
  ({ divider = true, todo }) => {
    const dispatch = useDispatch();
    const removeTodo = () => {
      dispatch(deleteTodoActionCreator({ id: todo._id }));
    };
    const toggleTodo = () => {
      dispatch(
        toggleTodoActionCreator({ id: todo._id, completed: !todo.completed }),
      );
    };

    return (
      <ListItem divider={divider}>
        <Checkbox onClick={toggleTodo} checked={todo.completed} disableRipple />
        <ListItemText primary={todo.text} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo" onClick={removeTodo}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  },
);
