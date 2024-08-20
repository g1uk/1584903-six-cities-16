const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getAttributeDate = (rawDate: string) => rawDate.split('T')[0];
export const getMarkUpDate = (rawDate: string) => {
  const date = new Date(rawDate);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};
