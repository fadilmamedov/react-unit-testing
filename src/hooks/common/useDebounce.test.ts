import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns initial value on mount', () => {
    const { result } = renderHook(() => useDebounce(1));

    expect(result.current).toBe(1);
  });

  test('keeps initial value after updates', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    rerender({ value: 3 });

    expect(result.current).toBe(1);
  });

  test('changes debounced value after 500ms', async () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    rerender({ value: 3 });

    act(() => {
      jest.advanceTimersByTime(500);
    });
    await waitFor(() => expect(result.current).toBe(3));
  });
});
