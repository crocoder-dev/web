import { getQuarter } from "date-fns";

const addMonths = (from = new Date(), months = 4): Date => {
  const y = from.getFullYear();
  const m = from.getMonth() + months;
  return new Date(y, m, 1);
};

export const quarterLabelInMonthsAhead = (
  monthsAhead = 4,
  from = new Date(),
): string => {
  const future = addMonths(from, monthsAhead);
  const q = getQuarter(future);

  return `Q${q} ${future.getFullYear()}`;
};
