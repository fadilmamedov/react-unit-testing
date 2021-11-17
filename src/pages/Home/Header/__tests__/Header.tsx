import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { useUser } from 'hooks/api/useUser';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Header } from '../Header';

jest.mock('hooks/api/useUser', () => {
  return {
    useUser: jest.fn(),
  };
});

describe('Header', () => {
  test('redirects to login page after logout', async () => {
    const history = createMemoryHistory();
    history.push('/');

    const useUserMock = useUser as jest.Mock;
    useUserMock.mockImplementation(() => ({
      user: null,
    }));

    render(
      <RecoilRoot>
        <Router history={history}>
          <Header />
        </Router>
      </RecoilRoot>
    );

    const logoutButton = screen.getByTestId('logoutButton');
    logoutButton.click();

    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });
});
