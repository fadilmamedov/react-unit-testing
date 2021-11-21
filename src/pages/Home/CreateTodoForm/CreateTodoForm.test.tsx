import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateTodoForm } from './CreateTodoForm';

describe('CreateTodoForm', () => {
  test('input has focus when component is shown', () => {
    render(<CreateTodoForm onCreate={jest.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  test('calls onCreate handler after submitting a text', () => {
    const onCreateMock = jest.fn();
    render(<CreateTodoForm onCreate={onCreateMock} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New todo item{enter}');

    expect(onCreateMock).toHaveBeenCalledWith('New todo item');
  });

  // TODO: Show TDD for this single test after we found this bug
  test('does not call onCreate handler when sumbitting with empty text', () => {
    const onCreateMock = jest.fn();
    render(<CreateTodoForm onCreate={onCreateMock} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, '{enter}');

    expect(onCreateMock).not.toHaveBeenCalled();
  });

  test('clears input after submitting a text', () => {
    render(<CreateTodoForm onCreate={jest.fn()} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New todo item{enter}');

    expect(input).toHaveDisplayValue('');
  });
});
