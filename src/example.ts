import { adviceByPlateData, adviceByDMY, adviceByWeekDay, WeekDay } from './index';

// Example 1: Using adviceByPlateData
const firstData = "กข";
const secondData = "1234";
try {
  const plateResult = adviceByPlateData(firstData, secondData);
  console.log("AdviceByPlateData Result:");
  console.log(JSON.stringify(plateResult, null, 2));
} catch (err) {
  console.log("Error in adviceByPlateData:", err.message);
}

// Example 2: Using adviceByDMY
const date = "01";
const month = "01";
const year = "2023";
try {
  const dmyResult = adviceByDMY(date, month, year);
  console.log("AdviceByDMY Result:");
  console.log(JSON.stringify(dmyResult, null, 2));
} catch (err) {
  console.log("Error in adviceByDMY:", err.message);
}

// Example 3: Using adviceByWeekDay
const day = WeekDay.Monday; // 1 for Monday
try {
  const weekdayResult = adviceByWeekDay(day);
  console.log("AdviceByWeekDay Result:");
  console.log(JSON.stringify(weekdayResult, null, 2));
} catch (err) {
  console.log("Error in adviceByWeekDay:", err.message);
}