import { TodoItem } from 'types/todo';

import { API_HOST } from './constants';

export const fetchTodos = async (query?: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append('_sort', 'date');
  queryParams.append('_order', 'desc');

  if (query) {
    queryParams.append('q', query);
  }

  const response = await fetch(`${API_HOST}/todos?${queryParams.toString()}`);
  const data = await response.json();
  return data as TodoItem[];
};

export const createTodo = async (todoItem: Omit<TodoItem, 'id'>) => {
  const response = await fetch(`${API_HOST}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoItem),
  });

  const data = await response.json();
  return data as TodoItem;
};

export const updateTodo = async (todoItem: TodoItem) => {
  const response = await fetch(`${API_HOST}/todos/${todoItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoItem),
  });

  const data = await response.json();
  return data as TodoItem;
};

export const removeTodo = async (todoItem: TodoItem) => {
  const response = await fetch(`${API_HOST}/todos/${todoItem.id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  return data as TodoItem;
};
