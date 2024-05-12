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
      categories,
      priority,
      block_no,
      schedule_interval,
      interval_unit,
    } = req.body;
    // console.log(interval_unit);
    // console.log(schedule_interval);
    const idd =
      "INSERT INTO preventive_maintenance (id,title, description, start_date, repetition, floor, room,categories,priority, block_no, schedule_interval, interval_unit) VALUES (?,?, ?, ?, ?, ?,?,?, ?, ?, ?, ?)";
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
        categories,
        priority,
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

export const checkPrevent = async (req, res) => {
  try {
    // Extract data from the request body

    const idd = "SELECT * FROM preventive_maintenance WHERE repetition > 0";

    db.query(idd, (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
      // console.log(results);

      results?.forEach((data) => {
        // console.log(data.start_date.toISOString().split("T")[0]);
        // console.log(new Date().toISOString().split("T")[0]);
        const startDate = data.start_date;
        const nextDays = new Date(startDate);
        nextDays.setDate(nextDays.getDate() + 1);

        // Get today's date
        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];

        // Convert nextDays date to a string in the format "YYYY-MM-DD"
        const nextDaysDateString = nextDays.toISOString().split("T")[0];
        // console.log(nextDaysDateString, todayDateString, "fff");
        if (nextDaysDateString === todayDateString) {
          // console.log("hello ahmed");
          const insertQuery = `INSERT INTO maintenance_requests (request_id, requester_id, request_date, completion_date, status, title,room,floor, description, image, priority, block_id,category) VALUES (?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?,?)`;

          // Assuming you have a connection pool named 'db'
          db.query(
            insertQuery,
            [
              uuidv4(), // Generate a new UUID for the request_id
              null,
              new Date(),
              null,
              "Pending", // Assuming 'Pending' is a valid status value
              data.title,
              data.room,
              data.floor,
              data.description,
              null, // Assuming technician_id starts as null
              data.priority,
              data.block_no,
              data.categories,
            ],
            (err, results) => {
              if (err) {
                console.error("Error inserting data:", err);
                res.status(500).send("Error inserting data into the database");
                return;
              }

              //   console.log("Data inserted successfully");
            }
          );
          // console.log(data.interval_unit);
          // console.log(data.schedule_interval);
          const nextScheduledDate = calculateNextScheduledDate(
            data.start_date,
            data.repetition,
            data.schedule_interval,
            data.interval_unit
          );
          // console.log(data.start_date.toISOString().split("T")[0], "hhhhhhh");
          console.log(nextScheduledDate);
          // console.log(
          //   new Date().toISOString().split("T")[0] ===
          //     data.start_date.toISOString().split("T")[0]
          // );
          // console.log(data.id, "dfghjkggggg");
          const fff = `UPDATE preventive_maintenance SET start_date = ? WHERE id = ?;`;
          db.query(fff, [nextScheduledDate, data.id], (err, results) => {
            if (err) {
              console.error("Error inserting data:", err);
              res.status(500).send("Error inserting data into the database");
              return;
            }

            // console.log("Data inserted successfully");
            // console.log(nextScheduledDate);
            res.status(200).send("Successfully");
          });
        }
      });

      // Return the query results as JSON
      // console.log("Hello aaaaaas");
    });

    // Respond with the ID of the inserted record
  } catch (error) {
    console.error("Error inserting into database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// (new Date()).toISOString().split("T")[0];

export const getPrevent = async (req, res) => {
  try {
    // Perform the SELECT operation
    const h = "SELECT * FROM preventive_maintenance";

    // Respond with the fetched records
    db.query(h, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data into the database");
        return;
      }

      // console.log(results);
      res.status(200).send(results);
    });
  } catch (error) {
    console.error("Error fetching from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getSingleUpdatePrevent = async (req, res) => {
  const {
    id,
    title,
    description,
    start_date,
    repetition,
    floor,
    categories,
    priority,
    room,
    block_no,
    schedule_interval,
    interval_unit,
  } = req.body;

  const updateQuery = `
    UPDATE preventive_maintenance
    SET
      title = ?,
      description = ?,
      start_date = ?,
      repetition = ?,
      floor = ?,
      categories = ?,
      priority = ?,
      room = ?,
      block_no = ?,
      schedule_interval = ?,
      interval_unit = ?
    WHERE id = ?;
  `;
  try {
    // Perform the SELECT operation

    // Respond with the fetched records
    db.query(
      updateQuery,
      [
        title,
        description,
        start_date,
        repetition,
        floor,
        categories,
        priority,
        room,
        block_no,
        schedule_interval,
        interval_unit,
        id,
      ],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("Error inserting data into the database");
          return;
        }

        // console.log(results);
        res.status(200).send("Successfully Edit");
      }
    );
  } catch (error) {
    console.error("Error fetching from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// app.delete('/preventive_maintenance/:id',

export const deletePrevent = (req, res) => {
  const id = req.params.id;

  const deleteQuery =
    "DELETE FROM preventive_maintenance WHERE `preventive_maintenance`.`id` = ?";

  db.query(deleteQuery, [id], (error, results, fields) => {
    if (error) {
      console.error("Error executing DELETE query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Record deleted successfully");
    }
  });
};

export const getPreventiveConf = async (req, res) => {
  try {
    // Perform the SELECT operation
    const h = `SELECT
    maintenance_requests.request_id,
    maintenance_requests.status,
     maintenance_requests.request_date,
     maintenance_requests.title,
    maintenance_requests.priority
  FROM
    maintenance_requests
  
    WHERE 
    maintenance_requests.requester_id IS null and maintenance_requests.status !='Closed' ;`;

    // Respond with the fetched records
    db.query(h, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data into the database");
        return;
      }

      // console.log(results);
      res.status(200).send(results);
    });
  } catch (error) {
    console.error("Error fetching from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
