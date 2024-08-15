export const useDate = (dateString: Date | null) => {
  if (!dateString) return;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-CA");
  return formattedDate;
};
