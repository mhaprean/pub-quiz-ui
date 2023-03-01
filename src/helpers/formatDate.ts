export const formatDate = (date: string) => {
  return new Date(date).toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const isSameDay = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

export const getFormatedDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('default', { year: 'numeric', month: 'short', day: 'numeric' });
};
