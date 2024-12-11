import { toDate } from "date-fns";

export const formatRawDate = (date: Date | string): Date => {
  const dDate = toDate(date);
  const mth = dDate.getMonth();
  const day = dDate.getDate();
  const year = dDate.getFullYear();
  return new Date(year, mth, day);
};
