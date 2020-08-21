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
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import { TodoListItem } from './TodoListItem';
import { todosSelector } from '../@store/todos/selectors';
import { TodoType } from '../@types';

interface Props {}

export const TodoList: React.FC<Props> = memo(() => {
  const { data: todos, editingTodoId } = useSelector(todosSelector);

  const BoxBlock = (
    <Box display="flex" p={1} bgcolor="background.paper">
      <Box p={1} flexGrow={1} bgcolor="grey.300">
        No items
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
      <Box p={1} bgcolor="grey.300">
        <Button variant="contained" color="primary">
          Clear completed
        </Button>
      </Box>
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
