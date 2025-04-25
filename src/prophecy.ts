import { 
  LuckyPoint,
  LuckyPointGroup,
  PlateCalculationResult,
  LuckyNumberAdvice,
  WeekDay
} from './types';
import { 
  thaiCharToNumberMap,
  luckyPointStore,
  luckyPointGroups,
  luckyNumberAdvice
} from './static';

// VALIDATION HELPERS
function isValidThaiChar(char: string): boolean {
  const re = /^[ก-ฮ]$/;
  return re.test(char);
}

function isValidFirstChar(char: string): boolean {
  const re = /^[0-9ก-ฮ]$/;
  return re.test(char);
}

function isValidNumber(char: string): boolean {
  const re = /^[0-9]$/;
  return re.test(char);
}

// UTILITY FUNCTIONS
/**
 * Gets the Thai character value from the mapping or returns the numeric value.
 * 
 * @param char The character to convert to a numeric value
 * @returns The numeric value of the character
 * @throws Error if the character is not a valid Thai character or number
 */
function getThaiCharValue(char: string): number {
  if (char in thaiCharToNumberMap) {
    return thaiCharToNumberMap[char];
  }

  if (isValidNumber(char)) {
    return parseInt(char, 10);
  }

  throw new Error(`Invalid Thai character: ${char}`);
}

/**
 * Gets the lucky point description for a given number.
 * 
 * @param point The point to look up
 * @returns The lucky point information
 * @throws Error if no lucky point is found for the given point
 */
function getLuckyPoint(point: number): LuckyPoint {
  let moduloPoint = point % 9;
  if (moduloPoint === 0) {
    moduloPoint = 9;
  }

  const luckyPoint = luckyPointStore.find(lp => lp.point === moduloPoint);
  if (!luckyPoint) {
    throw new Error(`Invalid point: ${point}`);
  }

  return luckyPoint;
}

/**
 * Determines which lucky group a sum belongs to.
 * 
 * @param sum The sum to check
 * @returns The lucky point group or null if not found
 */
function getLuckyPointGroup(sum: number): LuckyPointGroup | null {
  for (const group of luckyPointGroups) {
    if (group.points.includes(sum)) {
      return group;
    }
  }
  return null;
}

// VALIDATION FUNCTIONS
/**
 * Validates the first part of a Thai license plate.
 * 
 * @param firstData The first part of the license plate
 * @throws Error if the first part is invalid
 */
function validateFirstData(firstData: string): void {
  if (firstData.length > 3) {
    throw new Error("Invalid first part of license plate: too long");
  }

  const chars = [...firstData];
  if (!isValidFirstChar(chars[0])) {
    throw new Error("Invalid first character in license plate");
  }

  for (let i = 1; i < chars.length; i++) {
    if (!isValidThaiChar(chars[i])) {
      throw new Error("Invalid Thai character in license plate");
    }
  }
}

/**
 * Validates the second part of a Thai license plate.
 * 
 * @param secondData The second part of the license plate
 * @throws Error if the second part is invalid
 */
function validateSecondData(secondData: string): void {
  const matched = /^\d{1,4}$/.test(secondData);
  if (!matched) {
    throw new Error("Invalid second part of license plate");
  }
}

// MAIN CALCULATION FUNCTIONS
/**
 * Calculates the numerological value and meaning of a Thai license plate.
 * 
 * @param firstData The first part of the license plate (e.g., Thai characters)
 * @param secondData The numeric part of the license plate
 * @returns The calculation result containing values and meanings
 * @throws Error if validation fails or calculations cannot be completed
 */
export function adviceByPlateData(firstData: string, secondData: string): PlateCalculationResult {
  // Validate inputs
  validateFirstData(firstData);
  validateSecondData(secondData);

  // Calculate sums
  let firstDataSum = 0;
  for (const char of firstData) {
    firstDataSum += getThaiCharValue(char);
  }

  let secondDataSum = 0;
  for (const digit of secondData) {
    secondDataSum += parseInt(digit, 10);
  }

  const totalSum = firstDataSum + secondDataSum;

  // Handle double-digit secondDataSum
  let realSecondDataSum = secondDataSum;
  if (realSecondDataSum > 9) {
    let tempSum = 0;
    for (const digit of secondDataSum.toString()) {
      tempSum += parseInt(digit, 10);
    }
    realSecondDataSum = tempSum;
  }

  // Get meanings
  const secondDataLuckyPoint = getLuckyPoint(realSecondDataSum);
  const totalLuckyGroup = getLuckyPointGroup(totalSum);

  // Build result
  return {
    firstPart: {
      value: firstData,
      sum: firstDataSum
    },
    secondPart: {
      value: secondData,
      sum: realSecondDataSum,
      luckyPoint: secondDataLuckyPoint
    },
    total: {
      sum: totalSum,
      luckyGroup: totalLuckyGroup
    }
  };
}

/**
 * Provides lucky number advice based on a given date, month, and year.
 * 
 * @param date The day of the month (e.g., "01")
 * @param month The month (e.g., "01" for January)
 * @param year The year (e.g., "2023")
 * @returns The lucky number advice
 * @throws Error if the date format is invalid or no advice is found
 */
export function adviceByDMY(date: string, month: string, year: string): LuckyNumberAdvice {
  const inputFormat = `${year}-${month}-${date}`;

  // Format date from input
  const t = new Date(inputFormat);
  if (isNaN(t.getTime())) {
    throw new Error("Invalid date format");
  }

  // Get day from date
  const dayInt = t.getDay() as WeekDay;

  // Find luckyNumberAdvice by Day
  return adviceByWeekDay(dayInt);
}

/**
 * Provides lucky number advice based on the day of the week.
 * 
 * @param day The day of the week (0 for Sunday, 1 for Monday, etc.)
 * @returns The lucky number advice
 * @throws Error if no advice is found for the given day
 */
export function adviceByWeekDay(day: WeekDay): LuckyNumberAdvice {
  const advice = luckyNumberAdvice.find(a => a.day === day);
  if (!advice) {
    throw new Error("No advice found for the given day");
  }
  return advice;
}