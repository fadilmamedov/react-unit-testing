import { render, screen, within, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { todoItems } from '__fixtures__/todoItems';
import { useRemoveTodoItem } from 'hooks/api/useRemoveTodoItem';
import * as useRemoveTodoItemModule from 'hooks/api/useRemoveTodoItem';
import { useUpdateTodoItem } from 'hooks/api/useUpdateTodoItem';
import * as useUpdateTodoItemModule from 'hooks/api/useUpdateTodoItem';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { createQueryClient } from 'testUtils/queryClient';

import * as loadingIndicatorModule from './LoadingIndicator';
import * as todoItemModule from './TodoItem';
import { TodoList } from './TodoList';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_HOST}/todos`, (_, response, context) => {
    return response(context.delay(0), context.json(todoItems));
  })
);

const renderComponent = () => {
  return render(
    <QueryClientProvider client={createQueryClient()}>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const createHookWrapper = () => {
  const queryClient = createQueryClient();

  const wrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );

  return wrapper;
};

describe('TodoList', () => {
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

  test('shows loading indicator while fetching todos', () => {
    jest
      .spyOn(loadingIndicatorModule, 'LoadingIndicator')
      .mockImplementation(() => <div data-testid="loadingIndicator" />);

    renderComponent();

    const loadingIndicator = screen.getByTestId('loadingIndicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('shows correct number of todo items after fetching', async () => {
    jest.spyOn(todoItemModule, 'TodoItem').mockImplementation(() => <div data-testid="todoItem" />);

    renderComponent();

    const todoItemsElements = await screen.findAllByTestId('todoItem');
    expect(todoItemsElements).toHaveLength(todoItems.length);
  });

  test('calls todo item remove mutation', async () => {
    const todoItemToRemove = todoItems[0];

    const wrapper = createHookWrapper();
    const { result: hook } = renderHook(() => useRemoveTodoItem(), { wrapper });

    const mutateMock = jest.fn();
    jest.spyOn(useRemoveTodoItemModule, 'useRemoveTodoItem').mockImplementation(() => {
      return {
        ...hook.current,
        mutate: mutateMock,
      };
    });

    renderComponent();

    const todoItemToRemoveElement = await screen.findByText(todoItemToRemove.text);
    const removeButton = within(todoItemToRemoveElement).getByRole('button');
    userEvent.click(removeButton);

    await waitFor(() => {
      return expect(mutateMock).toHaveBeenCalledWith(todoItemToRemove);
    });
  });

  test('calls todo item update mutation with completed state', async () => {
    const todoItemToUpdate = todoItems.find((todoItem) => todoItem.completed);
    if (!todoItemToUpdate) {
      throw new Error('No completed todo item in fixture');
    }

    const wrapper = createHookWrapper();
    const { result: hook } = renderHook(() => useUpdateTodoItem(), { wrapper });

    const mutateMock = jest.fn();
    jest.spyOn(useUpdateTodoItemModule, 'useUpdateTodoItem').mockImplementation(() => {
      return {
        ...hook.current,
        mutate: mutateMock,
      };
    });

    renderComponent();

    const todoItemToUpdateElement = await screen.findByText(todoItemToUpdate.text);
    const todoItemCheckbox = within(todoItemToUpdateElement).getByRole('checkbox');
    userEvent.click(todoItemCheckbox);

    await waitFor(() => {
      return expect(mutateMock).toHaveBeenCalledWith({
        ...todoItemToUpdate,
        completed: false,
      });
    });
  });

  test('calls todo item update mutation with uncompleted state', async () => {
    const todoItemToUpdate = todoItems.find((todoItem) => !todoItem.completed);
    if (!todoItemToUpdate) {
      throw new Error('No completed todo item in fixture');
    }

    const wrapper = createHookWrapper();
    const { result: hook } = renderHook(() => useUpdateTodoItem(), { wrapper });

    const mutateMock = jest.fn();
    jest.spyOn(useUpdateTodoItemModule, 'useUpdateTodoItem').mockImplementation(() => {
      return {
        ...hook.current,
        mutate: mutateMock,
      };
    });

    renderComponent();

    const todoItemToUpdateElement = await screen.findByText(todoItemToUpdate.text);
    const todoItemCheckbox = within(todoItemToUpdateElement).getByRole('checkbox');
    userEvent.click(todoItemCheckbox);

    await waitFor(() => {
      return expect(mutateMock).toHaveBeenCalledWith({
        ...todoItemToUpdate,
        completed: true,
      });
    });
  });
});
