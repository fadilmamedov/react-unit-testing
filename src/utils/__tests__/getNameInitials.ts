import { getNameInitials } from '../getNameInitials';

describe('getNameInitials', () => {
  test('returns empty string for empty name', () => {
    const initials = getNameInitials('');

    expect(initials).toBe('');
  });

  test('returns correct initiais for two-words name', () => {
    const initials = getNameInitials('John Doe');

    expect(initials).toBe('JD');
  });

  test('returns correct initials for one-word name', () => {
    const initials = getNameInitials('Anonymous');

    expect(initials).toBe('AN');
  });

  test('returns correct initials for many-words name', () => {
    const initials = getNameInitials('Nhat Tuong Ngo');

    expect(initials).toBe('NT');
  });
});
