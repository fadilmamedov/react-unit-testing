import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useCreateTodoItem } from 'hooks/api/useCreateTodoItem';
import * as useCreateTodoModule from 'hooks/api/useCreateTodoItem';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { createQueryClient } from 'testUtils/queryClient';

import { HomePage } from './HomePage';

jest.mock('./Header/Header', () => ({
  Header: () => 'header',
}));
jest.mock('./TodoList/TodoList', () => ({
  TodoList: () => 'todo list',
}));

const renderComponent = () => {
  return render(
    <RecoilRoot>
      <HomePage />
    </RecoilRoot>
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

describe('HomePage', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('calls create todo item mutation', async () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('1989-10-13').getTime());

    const wrapper = createHookWrapper();
    const { result: hook } = renderHook(() => useCreateTodoItem(), { wrapper });

    const mutateMock = jest.fn();
    jest.spyOn(useCreateTodoModule, 'useCreateTodoItem').mockImplementation(() => {
      return {
        ...hook.current,
        mutate: mutateMock,
      };
    });

    renderComponent();

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New todo item{enter}');

    await waitFor(() => {
      return expect(mutateMock).toHaveBeenCalledWith({
        text: 'New todo item',
        date: '1989-10-13',
        completed: false,
      });
    });
  });
});
