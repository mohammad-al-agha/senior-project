export const useTime = (dateString: Date | null) => {
  if (!dateString) return;
  const date = new Date(dateString);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};
