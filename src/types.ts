// TYPES
export interface LuckyPoint {
  point: number;
  desc: string;
}

export interface LuckyPointGroup {
  group: string;
  points: number[];
  desc: string;
}

export interface PlateCalculationResult {
  firstPart: FirstPartData;
  secondPart: SecondPartData;
  total: TotalData;
}

export interface FirstPartData {
  value: string;
  sum: number;
}

export interface SecondPartData {
  value: string;
  sum: number;
  luckyPoint: LuckyPoint;
}

export interface TotalData {
  sum: number;
  luckyGroup: LuckyPointGroup | null;
}

export interface LuckyNumberAdvice {
  day: number;
  lucky_num_desc: string;
  lucky_num: number[];
  avoid_num_desc: string;
  avoid_num: number[];
  avoid_char_desc: string;
  avoid_char: string[];
}

export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  WednesdayNight = 7
}

export function weekDayToString(day: WeekDay): string {
  switch (day) {
    case WeekDay.Sunday:
      return "Sunday";
    case WeekDay.Monday:
      return "Monday";
    case WeekDay.Tuesday:
      return "Tuesday";
    case WeekDay.Wednesday:
      return "Wednesday";
    case WeekDay.Thursday:
      return "Thursday";
    case WeekDay.Friday:
      return "Friday";
    case WeekDay.Saturday:
      return "Saturday";
    case WeekDay.WednesdayNight:
      return "Wednesday (Night)";
    default:
      return "Unknown";
  }
}