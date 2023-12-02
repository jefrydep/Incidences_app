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
export const getStartTime = (date: Date) => {
  date.setHours(0, 0, 0, 0);

  const hora = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();

  const horaConCero = `${hora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  return horaConCero;
};
