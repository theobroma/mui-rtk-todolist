import React, { memo } from 'react';
import {
  List,
  Paper,
  Button,
  FormControl,
  Box,
  NativeSelect,
  FormHelperText,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { TodoListItem } from './TodoListItem';
import { todosSelector } from '../@store/todos/selectors';
import { filterSelector } from '../@store/filter/selectors';
import { TodoType } from '../@types';
import { pluralize } from '../@utils/pluralize';
import { removeCompletedActionCreator } from '../@store/todos/slice';

export const TodoList: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { data: todos, editingTodoId } = useSelector(todosSelector);
  const filter = useSelector(filterSelector);

  const activeTodoCount = todos.reduce((accum: number, todo: TodoType) => {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const completedCount = todos.length - activeTodoCount;

  const renderClearButton = () => {
    const handleButtonClick = () => {
      dispatch(removeCompletedActionCreator('any'));
    };

    if (completedCount > 0) {
      return (
        <Box p={1} bgcolor="grey.300">
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Clear completed
          </Button>
        </Box>
      );
    }
    return null;
  };

  const BoxBlock = (
    <Box display="flex" p={1} bgcolor="background.paper">
      <Box p={1} flexGrow={1} bgcolor="grey.300">
        <strong>{activeTodoCount}</strong> {pluralize(activeTodoCount, 'item')}{' '}
        left
      </Box>
      <Box p={1} bgcolor="grey.300">
        <FilterListIcon />
        <FormControl>
          <NativeSelect
            // className={classes.selectEmpty}
            // value={state.age}
            name="age"
            // onChange={handleChange}
            inputProps={{ 'aria-label': 'age' }}
          >
            <option value="" disabled>
              Placeholder
            </option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
          <FormHelperText>Filter</FormHelperText>
        </FormControl>
      </Box>
      {renderClearButton()}
    </Box>
  );
  return (
    <>
      {todos.length > 0 && (
        <Paper style={{ margin: 16 }}>
          {BoxBlock}
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
