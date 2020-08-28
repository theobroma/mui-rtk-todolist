export interface TodoType {
  _id: string;
  text: string | undefined;
  completed: boolean;
}

export type TodoListType = {
  data: TodoType[];
  editingTodoId: string | null;
  editingTodoTitle: string | undefined;
  loading: boolean;
};

export type FilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL' as FilterType,
  SHOW_COMPLETED: 'SHOW_COMPLETED' as FilterType,
  SHOW_ACTIVE: 'SHOW_ACTIVE' as FilterType,
};
