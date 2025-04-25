import {
  adviceByPlateData,
  adviceByDMY,
  adviceByWeekDay,
  WeekDay,
} from "./index";

console.log("Thai Plate Prophecy Examples\n");

// Example 1: Using adviceByPlateData
// This function provides advice based on Thai license plate data
const plateExample = {
  firstData: "กข",   // Thai characters on the plate
  secondData: "1234", // Numbers on the plate
};

try {
  const plateResult = adviceByPlateData(plateExample.firstData, plateExample.secondData);
  console.log("=== AdviceByPlateData Result ===");
  console.log("Input: License plate", plateExample.firstData + plateExample.secondData);
  console.log(JSON.stringify(plateResult, null, 2));
} catch (err) {
  console.error("Error in adviceByPlateData:", err instanceof Error ? err.message : String(err));
}

console.log("\n-----------------------------------\n");

// Example 2: Using adviceByDMY
// This function provides advice based on a specific date (day/month/year)
const birthDate = {
  date: "01",
  month: "01",
  year: "2023"
};

try {
  const dmyResult = adviceByDMY(birthDate.date, birthDate.month, birthDate.year);
  console.log("=== AdviceByDMY Result ===");
  console.log(`Input: Date ${birthDate.date}/${birthDate.month}/${birthDate.year}`);
  console.log(JSON.stringify(dmyResult, null, 2));
} catch (err) {
  console.error("Error in adviceByDMY:", err instanceof Error ? err.message : String(err));
}

console.log("\n-----------------------------------\n");

// Example 3: Using adviceByWeekDay
// This function provides advice based on a day of the week
const weekdayExample = WeekDay.Monday; // Using enum value for type safety

try {
  const weekdayResult = adviceByWeekDay(weekdayExample);
  console.log("=== AdviceByWeekDay Result ===");
  console.log(`Input: ${WeekDay[weekdayExample]} (${weekdayExample})`);
  console.log(JSON.stringify(weekdayResult, null, 2));
} catch (err) {
  console.error("Error in adviceByWeekDay:", err instanceof Error ? err.message : String(err));
}
