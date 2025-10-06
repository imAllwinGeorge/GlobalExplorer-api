import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export function getNextDaysInTimezone(
  n: number,
  timezone: string,
  recurrentceDays: string[],
) {
  const today = toZonedTime(new Date(), timezone);
  today.setHours(0, 0, 0, 0);

  const result: Date[] = [];

  for (let i = 0; i < n; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    targetDate.setHours(0, 0, 0, 0);

    const weekday = formatInTimeZone(targetDate, timezone, "EEEE");

    if (
      recurrentceDays
        .map((d) => d.toLocaleLowerCase())
        .includes(weekday.toLocaleLowerCase())
    ) {
      result.push(targetDate);
    }
  }

  return result;
}
