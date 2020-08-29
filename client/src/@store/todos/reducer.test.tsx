import { v1 } from 'uuid';
import { todosReducer } from './reducer';
import { actions } from './actions';
import { TodoListType } from '../../@types';

test('correct todolist should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodoListType = {
    data: [
      { id: todolistId1, text: 'What to learn', completed: false },
      { id: todolistId2, text: 'What to buy', completed: false },
    ],
    editingTodoId: null,
    editingTodoTitle: '',
    loading: false,
  };

  const newTodolistTitle = 'New Todolist';

  const endState = todosReducer(startState, actions.addTodo(newTodolistTitle));

  expect(endState.data.length).toBe(3);
  expect(endState.data[0].text).toBe(newTodolistTitle);
});

test('todolist byId should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodoListType = {
    data: [
      { id: todolistId1, text: 'What to learn', completed: false },
      { id: todolistId2, text: 'What to buy', completed: false },
    ],
    editingTodoId: null,
    editingTodoTitle: '',
    loading: false,
  };

  const endState = todosReducer(
    startState,
    actions.handleTodoRemove(todolistId1),
  );

  expect(endState.data.length).toBe(1);
  expect(endState.data[0].id).toBe(todolistId2);
});

test('todolist byId should be toggled', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodoListType = {
    data: [
      { id: todolistId1, text: 'What to learn', completed: false },
      { id: todolistId2, text: 'What to buy', completed: false },
    ],
    editingTodoId: null,
    editingTodoTitle: '',
    loading: false,
  };

  const endState = todosReducer(
    startState,
    actions.handleTodoToggle(todolistId1),
  );
  const bool = endState.data.find((t) => t.id === todolistId1)?.completed;
  expect(endState.data[0].completed).toBe(bool);
});
