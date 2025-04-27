# Thai plate prophecy TypeScript(TH-Version)

This project is designed to help customers predict or "prophecy" potential license plate numbers. By leveraging algorithms and user input, it provides insights and suggestions for plate numbers that may hold significance or align with user preferences.  

โครงการนี้ถูกออกแบบมาเพื่อช่วยให้ผู้ใช้งานสามารถทำนายหรือ "พยากรณ์" หมายเลขทะเบียนรถที่เป็นไปได้ โดยใช้การประมวลผลผ่านอัลกอริทึมและข้อมูลที่ผู้ใช้งานให้มา เพื่อให้คำแนะนำและข้อมูลเชิงลึกเกี่ยวกับหมายเลขทะเบียนที่อาจมีความหมายหรือสอดคล้องกับความชอบของผู้ใช้งาน

Golang version : https://github.com/naruebaet/thai-plate-prophecy-go

## How to install
```shell
$ npm install thai-plate-prophecy-ts
```

## Feature
| Feature Name       | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Plate Prediction   | Predicts potential license plate numbers based on user input and algorithms. |
| User Preferences   | Allows customization of predictions to align with user preferences.         |
| Algorithm Insights | Provides transparency into how predictions are generated.                  |

## Public Functions and Usage

### 1. `adviceByPlateData`
**Description**: Calculates the numerological value and meaning of a Thai license plate.

**Parameters**:
- `firstData` (string): The first part of the license plate (e.g., Thai characters).
- `secondData` (string): The numeric part of the license plate.

**Returns**:
- `PlateCalculationResult`: Contains the calculated values and meanings.
- Throws an error if validation fails or an error occurs.

**Example**:
```typescript
import { adviceByPlateData } from 'thai-plate-prophecy-ts';

try {
  const result = adviceByPlateData("กข", "1234");
  console.log("Result:", result);
} catch (err) {
  console.log("Error:", err.message);
}
```

---

### 2. `adviceByDMY`
**Description**: Provides lucky number advice based on a given date, month, and year.

**Parameters**:
- `date` (string): The day of the month (e.g., "01").
- `month` (string): The month (e.g., "01" for January).
- `year` (string): The year (e.g., "2023").

**Returns**:
- `LuckyNumberAdvice`: Contains the lucky number advice.
- Throws an error if the date format is invalid or no advice is found.

**Example**:
```typescript
import { adviceByDMY } from 'thai-plate-prophecy-ts';

try {
  const advice = adviceByDMY("01", "01", "2023");
  console.log("Advice:", advice);
} catch (err) {
  console.log("Error:", err.message);
}
```

---

### 3. `adviceByWeekDay`
**Description**: Provides lucky number advice based on the day of the week.

**Parameters**:
- `day` (WeekDay): The day of the week (0 for Sunday, 1 for Monday, etc.).

**Returns**:
- `LuckyNumberAdvice`: Contains the lucky number advice.
- Throws an error if no advice is found for the given day.

**Example**:
```typescript
import { adviceByWeekDay, WeekDay } from 'thai-plate-prophecy-ts';

try {
  const advice = adviceByWeekDay(WeekDay.Monday);
  console.log("Advice:", advice);
} catch (err) {
  console.log("Error:", err.message);
}
```

### Support me coffee
[Buy me a coffee](https://www.buymeacoffee.com/alpakalab)

Crafted by : [Alpaka LAB](https://alpakalab.com)