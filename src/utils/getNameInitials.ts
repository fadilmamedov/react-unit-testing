export const getNameInitials = (name: string) => {
  if (name.trim().length === 0) return '';

  const nameParts = name.split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase();
  }

  return nameParts
    .map((namePart) => namePart[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};
