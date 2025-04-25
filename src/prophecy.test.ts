import { adviceByPlateData, adviceByDMY, adviceByWeekDay } from './prophecy';
import { LuckyNumberAdvice, LuckyPoint, LuckyPointGroup, PlateCalculationResult, WeekDay } from './types';
import * as staticData from './static';

// Mock the static data for testing
jest.mock('./static', () => {
  const originalModule = jest.requireActual('./static');
  
  return {
    ...originalModule,
    thaiCharToNumberMap: {
      'ก': 1, 'ข': 2,
      '1': 1, '2': 2, '3': 3, '4': 4
    },
    luckyPointStore: [
      { point: 1, desc: "Test Point 1" },
      { point: 5, desc: "Test Point 5" },
      { point: 9, desc: "Test Point 9" }
    ],
    luckyPointGroups: [
      { group: "best", points: [10, 19, 28], desc: "Test Group 1" },
      { group: "medium", points: [13, 20, 29], desc: "Test Group 2" }
    ],
    luckyNumberAdvice: [
      { day: 0, lucky_num_desc: "เลขมงคลสำหรับคนเกิดวันอาทิตย์", lucky_num: [1, 2], avoid_num_desc: "", avoid_num: [], avoid_char_desc: "", avoid_char: [] },
      { day: 5, lucky_num_desc: "xxx", lucky_num: [1, 2], avoid_num_desc: "", avoid_num: [], avoid_char_desc: "", avoid_char: [] },
      { day: 2, lucky_num_desc: "เลขมงคลสำหรับคนเกิดวันอังคาร", lucky_num: [1, 2], avoid_num_desc: "", avoid_num: [], avoid_char_desc: "", avoid_char: [] }
    ]
  };
});

describe('adviceByPlateData', () => {
  // Helper function to create expected results
  function createExpectedResult(
    firstValue: string, firstSum: number,
    secondValue: string, secondSum: number, secondPoint: LuckyPoint,
    totalSum: number, luckyGroup: LuckyPointGroup | null
  ): PlateCalculationResult {
    return {
      firstPart: {
        value: firstValue,
        sum: firstSum
      },
      secondPart: {
        value: secondValue,
        sum: secondSum,
        luckyPoint: secondPoint
      },
      total: {
        sum: totalSum,
        luckyGroup: luckyGroup
      }
    };
  }

  test('should correctly calculate for valid Thai characters and numbers', () => {
    const result = adviceByPlateData('กข', '1234');
    
    const expected = createExpectedResult(
      'กข', 3,  // firstValue, firstSum
      '1234', 1, { point: 1, desc: "Test Point 1" },  // secondValue, secondSum, secondPoint
      13, { group: "medium", points: [13, 20, 29], desc: "Test Group 2" }  // totalSum, luckyGroup
    );
    
    expect(result).toEqual(expected);
  });

  test('should throw error for first part with too many characters', () => {
    expect(() => adviceByPlateData('กขคง', '1234')).toThrow('too long');
  });

  test('should throw error for invalid first character', () => {
    expect(() => adviceByPlateData('A', '1234')).toThrow('Invalid first character');
  });

  test('should throw error for invalid second part - non-numeric', () => {
    expect(() => adviceByPlateData('กข', '123A')).toThrow('Invalid second part');
  });

  test('should throw error for invalid second part - too long', () => {
    expect(() => adviceByPlateData('กข', '12345')).toThrow('Invalid second part');
  });

  test('should accept numeric first part', () => {
    const result = adviceByPlateData('1', '234');
    
    const expected = createExpectedResult(
      '1', 1,  // firstValue, firstSum
      '234', 9, { point: 9, desc: "Test Point 9" },  // secondValue, secondSum, secondPoint
      10, { group: "best", points: [10, 19, 28], desc: "Test Group 1" }  // totalSum, luckyGroup
    );
    
    expect(result).toEqual(expected);
  });
});

describe('adviceByDMY', () => {
  test('should provide advice for a valid date', () => {
    // Mock the Date constructor to return a specific day of week
    const originalDate = global.Date;
    global.Date = class extends Date {
      getDay() {
        return 0; // Sunday
      }
    } as any;

    const result = adviceByDMY('01', '01', '2023');
    expect(result.lucky_num_desc).toBe('เลขมงคลสำหรับคนเกิดวันอาทิตย์');
    
    // Restore the original Date
    global.Date = originalDate;
  });

  test('should throw error for invalid date format', () => {
    expect(() => adviceByDMY('32', '01', '2023')).toThrow('Invalid date format');
  });
});

describe('adviceByWeekDay', () => {
  test('should provide advice for valid weekday', () => {
    const result = adviceByWeekDay(WeekDay.Sunday);
    expect(result.lucky_num_desc).toBe('เลขมงคลสำหรับคนเกิดวันอาทิตย์');
  });

  test('should throw error for weekday with no advice', () => {
    expect(() => adviceByWeekDay(WeekDay.Monday)).toThrow('No advice found');
  });
});