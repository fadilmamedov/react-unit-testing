import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as useUserModule from 'hooks/api/useUser';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Header } from './Header';

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to login page after logout', async () => {
    jest.spyOn(useUserModule, 'useUser').mockImplementation(() => ({
      user: undefined,
      isLoading: false,
    }));

    const history = createMemoryHistory();
    history.push('/');

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
