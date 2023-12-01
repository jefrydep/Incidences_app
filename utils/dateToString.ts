export const dateToStringWithTime = (date: Date, hora?: boolean): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  if (hora) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

export const dateToString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
