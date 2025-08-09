export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
