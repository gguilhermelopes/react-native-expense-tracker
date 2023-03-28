export const setFormattedDate = (date) => {
  const dateArray = date.split("/");
  return `${dateArray[2]}-${dateArray[1]}-${+dateArray[0] + 1}`;
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
