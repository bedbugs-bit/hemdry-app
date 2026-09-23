import { addDays, startOfDay } from "date-fns";

export function getPickupDates(today = new Date(), count = 30) {
  const start = startOfDay(today);
  return Array.from({ length: count }, (_, index) => addDays(start, index));
}
