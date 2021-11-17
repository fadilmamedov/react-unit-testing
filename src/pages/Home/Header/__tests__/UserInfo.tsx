import { render, screen } from '@testing-library/react';
import { getNameInitials } from 'utils/getNameInitials';

import { UserInfo } from '../UserInfo';

jest.mock('utils/getNameInitials', () => {
  return {
    getNameInitials: jest.fn(),
  };
});

describe('UserInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders user name', () => {
    render(<UserInfo fullName="John Doe" />);

    const userName = screen.getByText(/John Doe/i);
    expect(userName).toBeInTheDocument();
  });

  test('renders Anonymous when name is missing', () => {
    render(<UserInfo />);

    const userName = screen.getByText(/Anonymous/i);
    expect(userName).toBeInTheDocument();
  });

  test('renders avatar image', () => {
    const avatarURL = 'http://example.com/avatar.png';
    render(<UserInfo avatarURL={avatarURL} />);

    const avatarImage = screen.queryByRole('img');
    expect(avatarImage).toHaveAttribute('src', avatarURL);
  });

  test('renders name initials when avatar is missing', () => {
    const getNameInitialsMock = getNameInitials as jest.Mock;
    getNameInitialsMock.mockImplementation(() => 'JD');
    render(<UserInfo fullName="John Doe" />);

    const initials = screen.getByText(/JD/i);
    expect(initials).toBeInTheDocument();
  });
});
