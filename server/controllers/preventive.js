import { db } from "../db.js";
// import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cron from "node-cron";
export function scheduleMaintenanceTasks() {
  const query = "SELECT * FROM preventive_maintenance WHERE repetition > 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching maintenance records:", err);
      return;
    }

    results.forEach((maintenance) => {
      const { id, start_date, repetition, schedule_interval, interval_unit } =
        maintenance;

      //   const nextScheduledDate = calculateNextScheduledDate(
      //     last_scheduled_date,
      //     repetition,
      //     schedule_interval
      //   );
      const nextScheduledDate = calculateNextScheduledDate(
        start_date,
        repetition,
        schedule_interval,
        interval_unit
      );
      // Schedule maintenance using node-cron
      //   cron.schedule(`0 0 * * *`, () => {
      //     console.log(
      //       `Scheduled maintenance for ID ${id} on ${nextScheduledDate}`
      //     );
      //     // Perform maintenance tasks here
      //     // You can update last_scheduled_date in the database after completing the maintenance
      //   });
      console.log(`Next scheduled date: ${nextScheduledDate}`);
    });
  });
}

// Function to calculate the next scheduled date based on repetition and schedule_interval

function calculateNextScheduledDate(
  startDate,
  repetition,
  scheduleInterval,
  intervalUnit
) {
  const nextDate = new Date(startDate);
  console.log(intervalUnit);
  switch (intervalUnit) {
    case "days":
      nextDate.setDate(startDate.getDate() + 1 * scheduleInterval);
      break;
    case "weeks":
      nextDate.setDate(startDate.getDate() + 1 * scheduleInterval * 7);
      break;
    case "months":
      nextDate.setMonth(startDate.getMonth() + 1 * scheduleInterval);
      break;
    // Add more cases as needed for other units

    default:
      throw new Error("Invalid interval unit");
  }

  return nextDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
}

export const prevent = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      title,
      description,
      start_date,
      repetition,
      floor,
      room,
      block_no,
      schedule_interval,
      interval_unit,
    } = req.body;
    const idd =
      "INSERT INTO preventive_maintenance (id,title, description, start_date, repetition, floor, room, block_no, schedule_interval, interval_unit) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // Perform the INSERT operation

    db.query(
      idd,
      [
        uuidv4(),
        title,
        description,
        start_date,
        repetition,
        floor,
        room,
        block_no,
        schedule_interval,
        interval_unit,
      ],
      (error, results) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Return the query results as JSON
        res.status(200).json("Successfully Sechedule");
      }
    );

    // Respond with the ID of the inserted record
  } catch (error) {
    console.error("Error inserting into database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
