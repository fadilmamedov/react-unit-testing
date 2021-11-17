import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';

import { LoginPage } from '../LoginPage';

const server = setupServer();

const fillLoginForm = (email: string, password: string) => {
  const emailInput = screen.getByLabelText(/email address/i);
  userEvent.type(emailInput, email);
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, password);
};

const submitLoginForm = () => {
  const button = screen.getByRole('button', { name: /sign in/i });
  userEvent.click(button);
};

describe('LoginPage', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  test('redirects to home page after a successful login', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API_HOST}/login`, (_, response, context) => {
        return response(
          context.json({
            data: {
              message: 'OK',
            },
          })
        );
      })
    );

    const queryClient = new QueryClient();

    const history = createMemoryHistory();
    history.push('/login');

    render(
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </QueryClientProvider>
    );

    fillLoginForm('john.doe@gmail.com', '111111');
    submitLoginForm();

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  test('stays on login page after failed login', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API_HOST}/login`, (_, response, context) => {
        return response(
          context.status(401),
          context.json({
            data: {
              message: 'Invalid email or password',
            },
          })
        );
      })
    );

    const queryClient = new QueryClient();

    const history = createMemoryHistory();
    history.push('/login');

    render(
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </QueryClientProvider>
    );

    fillLoginForm('john.doe@gmail.com', '111111');
    submitLoginForm();

    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });
});
