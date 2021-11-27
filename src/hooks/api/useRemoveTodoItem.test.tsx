import { renderHook } from '@testing-library/react-hooks';
import { todoItems } from '__fixtures__/todoItems';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { createQueryClient } from 'testUtils/queryClient';

import { useRemoveTodoItem } from './useRemoveTodoItem';
import * as useTodosQueryModule from './useTodosQuery';

const BASE_QUERY = 'todos';
const SEARCH_QUERY = ['todos', ''];

const server = setupServer();

const setupQueryClient = () => {
  const queryClient = createQueryClient();
  queryClient.setQueryData(['todos', ''], todoItems);

  const wrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, queryClient };
};

describe('useRemoveTodoItem', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });

  test('removes todo item with optimistic update', async () => {
    server.use(
      rest.delete('**/todos/:todoID', (_, response, context) => {
        return response(context.json({}));
      })
    );

    jest.spyOn(useTodosQueryModule, 'useTodosQuery').mockImplementation(() => ({
      baseQuery: BASE_QUERY,
      searchQuery: SEARCH_QUERY,
    }));

    const todoItemToRemove = todoItems[0];

    const { wrapper, queryClient } = setupQueryClient();
    const { result: hook } = renderHook(() => useRemoveTodoItem(), { wrapper });

    await hook.current.mutateAsync(todoItemToRemove);

    const result = queryClient.getQueryData(SEARCH_QUERY);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "completed": false,
          "date": "2021-11-10",
          "id": 2,
          "text": "second todo item",
        },
        Object {
          "completed": false,
          "date": "2021-11-11",
          "id": 3,
          "text": "third todo item",
        },
      ]
    `);
  });

  test('restores removed item after failed request', async () => {
    server.use(
      rest.delete('**/todos/:todoID', (_, response, context) => {
        return response(context.status(500), context.json({}));
      })
    );

    jest.spyOn(useTodosQueryModule, 'useTodosQuery').mockImplementation(() => ({
      baseQuery: BASE_QUERY,
      searchQuery: SEARCH_QUERY,
    }));

    const todoItemToRemove = todoItems[0];

    const { wrapper, queryClient } = setupQueryClient();
    const { result: hook } = renderHook(() => useRemoveTodoItem(), { wrapper });

    try {
      await hook.current.mutateAsync(todoItemToRemove);
    } catch {}

    const result = queryClient.getQueryData(SEARCH_QUERY);
    expect(result).toEqual(todoItems);
  });
});
