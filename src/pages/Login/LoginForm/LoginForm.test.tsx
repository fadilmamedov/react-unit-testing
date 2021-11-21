import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('calls onSubmit event handler after filling and submitting', () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText(/email address/i);
    userEvent.type(emailInput, 'john.doe@gmail.com');
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, '111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    userEvent.click(button);

    expect(onSubmitMock).toHaveBeenCalledWith('john.doe@gmail.com', '111111');
  });

  test('does not call onSubmit event handlers when email is not privided', () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, '111111');
    const button = screen.getByRole('button', { name: /sign in/i });
    userEvent.click(button);

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test('does not call onSubmit event handlers when password is not privided', () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText(/email address/i);
    userEvent.type(emailInput, 'john.doe@gmail.com');
    const button = screen.getByRole('button', { name: /sign in/i });
    userEvent.click(button);

    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
