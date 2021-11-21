import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TodoItem } from '../TodoItem';

describe('TodoItem', () => {
  test('renders text', () => {
    render(
      <TodoItem
        text="todo item"
        onComplete={jest.fn()}
        onUncomplete={jest.fn()}
        onRemove={jest.fn}
      />
    );

    const text = screen.queryByText('todo item');
    expect(text).toBeInTheDocument();
  });

  test('shows checked/unchecked state', () => {
    const props = {
      text: 'todo item',
      completed: true,
      onComplete: jest.fn(),
      onUncomplete: jest.fn(),
      onRemove: jest.fn(),
    };

    const { rerender } = render(<TodoItem {...props} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    const uncheckedProps = { ...props, completed: false };
    rerender(<TodoItem {...uncheckedProps} />);

    expect(checkbox).not.toBeChecked();
  });

  test('calls correct event handler for unchecked state', () => {
    const onCompleteMock = jest.fn();
    const onUncompleteMock = jest.fn();

    render(
      <TodoItem
        text="todo item"
        onComplete={onCompleteMock}
        onUncomplete={onUncompleteMock}
        onRemove={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    expect(onCompleteMock).toHaveBeenCalled();
    expect(onUncompleteMock).not.toHaveBeenCalled();
  });

  test('calls correct event handler for checked state', () => {
    const onCompleteMock = jest.fn();
    const onUncompleteMock = jest.fn();

    render(
      <TodoItem
        text="todo item"
        completed
        onComplete={onCompleteMock}
        onUncomplete={onUncompleteMock}
        onRemove={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    expect(onUncompleteMock).toHaveBeenCalled();
    expect(onCompleteMock).not.toHaveBeenCalled();
  });
});
