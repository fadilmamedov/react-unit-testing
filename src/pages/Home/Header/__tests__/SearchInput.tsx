import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  test('hides clear search button for empty string', () => {
    render(<SearchInput value="" onChange={jest.fn()} />);

    const clearButton = screen.queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  test('shows clear search button for non-empty string', () => {
    render(<SearchInput value="search" onChange={jest.fn()} />);

    const clearButton = screen.queryByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  test('focuses input after clear button is clicked', () => {
    render(<SearchInput value="search" onChange={jest.fn()} />);

    const clearButton = screen.getByRole('button');
    userEvent.click(clearButton);

    const input = screen.queryByRole('textbox');
    expect(input).toHaveFocus();
  });

  test('updates search input with a new value', () => {
    const { rerender } = render(<SearchInput value="search" onChange={jest.fn()} />);

    rerender(<SearchInput value="search updated" onChange={jest.fn()} />);

    const input = screen.queryByRole('textbox');
    expect(input).toHaveDisplayValue('search updated');
  });
});
