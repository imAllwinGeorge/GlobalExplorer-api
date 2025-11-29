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

export function expiryDateForQR(date: string | Date): Date {
  const bookingDate = new Date(date);

  const expiry = new Date(bookingDate);
  expiry.setHours(23, 59, 59, 999);

  return expiry;
}

export function resolveDateRange(
  type: string,
  from?: string,
  to?: string,
): Record<string, Date> | null {
  const start = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999); // End of today by default

  switch (type) {
    case "today":
      start.setHours(0, 0, 0, 0);
      return { $gte: start, $lte: end };

    case "yesterday":
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      return { $gte: start, $lte: end };

    case "week":
      start.setDate(start.getDate() - 7);
      return { $gte: start, $lte: end };

    case "month":
      start.setMonth(start.getMonth() - 1);
      return { $gte: start, $lte: end };

    case "year":
      start.setFullYear(start.getFullYear() - 1);
      return { $gte: start, $lte: end };

    case "all":
      // No start limit, only show entries up to today
      return { $lte: end };

    default:
      if (from && to) {
        return {
          $gte: new Date(from),
          $lte: new Date(to),
        };
      }
      if (from && !to) {
        return {
          $gte: new Date(from),
          $lte: end,
        };
      }
      return null;
  }
}
