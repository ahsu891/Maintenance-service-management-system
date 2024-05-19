import bcrypt from "bcryptjs";
import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { rejects } from "assert";

export const getRep = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT 
  finished_requests.*,
  maintenance_requests.request_id,
  maintenance_requests.title,
    CONCAT(users.first_name, ' ', users.last_name) AS requester_name,
  maintenance_requests.category,
  maintenance_requests.completion_date,
  CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
FROM 
  finished_requests
JOIN 
  maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
JOIN 
  technicians ON finished_requests.technician_id = technicians.technician_id
  JOIN 
  users ON users.user_id = maintenance_requests.requester_id
GROUP BY 
  maintenance_requests.request_id;
;
    `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getSingleRep = (req, res) => {
  const { requestId } = req.body; // Replace with the actual request ID from req.params or req.body

  // Execute the SQL queries
  const sqlQuery = `
    SELECT 
      finished_requests.*,
      maintenance_requests.request_id,
      maintenance_requests.title,
      maintenance_requests.category,
      CONCAT(users.first_name, ' ', users.last_name) AS requester_name,
      maintenance_requests.category,
      maintenance_requests.completion_date,
      users.phone,
      users.job,
      CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
    FROM 
      finished_requests
    JOIN 
      maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
    JOIN 
      technicians ON finished_requests.technician_id = technicians.technician_id
      LEFT JOIN 
      users ON users.user_id = maintenance_requests.requester_id
    WHERE  maintenance_requests.request_id=?
    GROUP BY 
      maintenance_requests.request_id
      ORDER BY maintenance_requests.request_date DESC;
  `;

  const technicianQuery = `
    SELECT 
      CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
    FROM 
      finished_requests
    JOIN 
      maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
    JOIN 
      technicians ON finished_requests.technician_id = technicians.technician_id
     left JOIN 
      users ON users.user_id = maintenance_requests.requester_id
    WHERE  maintenance_requests.request_id=?
  `;

  const materialQuery = ` SELECT maintenance_request_materials.*,
  inventory.item_name FROM finished_requests
  JOIN maintenance_request_materials ON maintenance_request_materials.request_id = finished_requests.request_id 
  JOIN maintenance_requests ON maintenance_requests.request_id = finished_requests.request_id 
  LEFT JOIN inventory ON inventory.id=maintenance_request_materials.material_id 
  WHERE maintenance_requests.request_id =? And maintenance_request_materials.status="Closed" ;`;
  //   SELECT material_used.detail
  //   FROM finished_requests
  //   JOIN material_used ON material_used.work_id = finished_requests.finished_id
  //   JOIN maintenance_requests ON maintenance_requests.request_id = finished_requests.request_id
  //   WHERE maintenance_requests.request_id = ?;
  // `;

  // Execute the queries in parallel
  db.query(sqlQuery, [requestId], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    // console.log(results);
    const responseObj = {
      maintenanceDetails: results,
    };

    db.query(technicianQuery, [requestId], (error, technicianResults) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      responseObj.technicianDetails = technicianResults;

      db.query(materialQuery, [requestId], (error, materialResults) => {
        if (error) {
          console.error("Error executing the query:", error);
          res.status(500).send("Internal Server Error");
          return;
        }

        responseObj.materialDetails = materialResults;
        // Return the combined results as JSON

        console.log(responseObj);
        res.status(200).json(responseObj);
      });
    });
  });
};
export const getTopDashboard = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT 
  SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS total_pending,
  ROUND((SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS pending_percentage,
  
  SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) AS total_assigned,
  ROUND((SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS assigned_percentage,
  
  SUM(CASE WHEN status IN ('Rejected', 'Cancelled') THEN 1 ELSE 0 END) AS total_rejected,
  ROUND((SUM(CASE WHEN status IN ('Rejected', 'Cancelled') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS rejected_percentage,
  
  SUM(CASE WHEN status IN ('Closed', 'Completed') THEN 1 ELSE 0 END) AS total_completed,
  ROUND((SUM(CASE WHEN status IN ('Closed', 'Completed') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS completed_percentage
FROM 
  maintenance_requests;

;
    `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getTopDashboardRequester = (req, res) => {
  // Execute the SQL query
  const { user_id } = req.body;
  console.log(user_id);
  const sqlQuery = `
 
  SELECT 
  SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS total_pending,
  ROUND((SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS pending_percentage,
  
  SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) AS total_assigned,
  ROUND((SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS assigned_percentage,
  
  SUM(CASE WHEN status IN ('Rejected', 'Cancelled') THEN 1 ELSE 0 END) AS total_rejected,
  ROUND((SUM(CASE WHEN status IN ('Rejected', 'Cancelled') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS rejected_percentage,
  
  SUM(CASE WHEN status IN ('Closed', 'Completed') THEN 1 ELSE 0 END) AS total_completed,
  ROUND((SUM(CASE WHEN status IN ('Closed', 'Completed') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS completed_percentage
FROM 
  maintenance_requests
  WHERE requester_id=?;


    `;

  db.query(sqlQuery, [user_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getCharData = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT 
  SUM(CASE WHEN category = 'Water' THEN 1 ELSE 0 END) AS total_water,
  ROUND((SUM(CASE WHEN category = 'Water' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS water_percentage,
  
  SUM(CASE WHEN category = 'General' THEN 1 ELSE 0 END) AS total_general,
  ROUND((SUM(CASE WHEN category = 'General' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS general_percentage,
  
  SUM(CASE WHEN category = 'Electrical' THEN 1 ELSE 0 END) AS total_electrical,
  ROUND((SUM(CASE WHEN category = 'Electrical' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS electrical_percentage,
  
  SUM(CASE WHEN category = 'Other' THEN 1 ELSE 0 END) AS total_other,
  ROUND((SUM(CASE WHEN category = 'Other' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS other_percentage
  
FROM 
  maintenance_requests;

    `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getCharDataInv = (req, res) => {
  // Execute the SQL query
  const sqlQuery = `SELECT 
  SUM(CASE WHEN item_category = 'Water' THEN quantity ELSE 0 END) AS total_water,
  ROUND((SUM(CASE WHEN item_category = 'Water' THEN quantity ELSE 0 END) / SUM(quantity)) * 100, 2) AS water_percentage,
  
  SUM(CASE WHEN item_category = 'General' THEN quantity ELSE 0 END) AS total_general,
  ROUND((SUM(CASE WHEN item_category = 'General' THEN quantity ELSE 0 END) / SUM(quantity)) * 100, 2) AS general_percentage,
  
  SUM(CASE WHEN item_category = 'Electrical' THEN quantity ELSE 0 END) AS total_electrical,
  ROUND((SUM(CASE WHEN item_category = 'Electrical' THEN quantity ELSE 0 END) / SUM(quantity)) * 100, 2) AS electrical_percentage,
  
  SUM(CASE WHEN item_category = 'Other' THEN quantity ELSE 0 END) AS total_other,
  ROUND((SUM(CASE WHEN item_category = 'Other' THEN quantity ELSE 0 END) / SUM(quantity)) * 100, 2) AS other_percentage
  
  
FROM 
  inventory;
`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};
export const getDashTech = (req, res) => {
  // Execute the SQL query
  const { tech_id } = req.body;
  const sqlQuery = `
  SELECT 
    SUM(CASE WHEN result.status IN ('Assigned', 'Completed')  THEN 1 ELSE 0 END) AS total_assigned
   
    
    
  FROM (
      SELECT 
          maintenance_requests.*
      FROM 
          maintenance_requests
      JOIN 
          technicians_assigned ON technicians_assigned.request_id = maintenance_requests.request_id
     
          WHERE technicians_assigned.technician_id=?
          
          
        ) AS result
        
        `;
  const sqlQueryC = `
        
        SELECT 
        SUM(CASE WHEN result.status = 'Closed' THEN 1 ELSE 0 END) AS total_completed
        
        FROM (
          SELECT 
          maintenance_requests.*
          FROM 
          maintenance_requests
          JOIN 
          finished_requests ON finished_requests.request_id = maintenance_requests.request_id
          
          WHERE finished_requests.technician_id=?
     
  ) AS result
   
        
        `;

  db.query(sqlQuery, [tech_id], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    const totalAssigned = results[0].total_assigned;
    db.query(sqlQueryC, [tech_id], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
      const total_completed = results[0].total_completed;
      // Return the query results as JSON
      // console.log(total_completed, totalAssigned);

      res.status(200).send([{ total_completed, totalAssigned }]);
    });
    // Return the query results as JSON
  });
};
export const getDashInv = (req, res) => {
  // Execute the SQL query

  const sqlQuery = `SELECT 
  (SELECT COUNT(*) FROM inventory) AS total_inventory,
  (SELECT COUNT(*) FROM inventory WHERE quantity < 3) AS low_inventory_count,
  ROUND(((SELECT COUNT(*) FROM inventory WHERE quantity < 3) * 100.0 / (SELECT COUNT(*) FROM inventory)), 2) AS average_quantity_low_inventory;
`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the query results as JSON
    res.status(200).send(results);
  });
};

export const getDashGraph = (req, res) => {
  const q = `SELECT DATE_FORMAT(request_date, '%Y-%m') AS month_value, 
  COUNT(*) AS count 
  FROM maintenance_requests 
  WHERE request_date >= DATE_SUB(CURDATE(), 
  INTERVAL 1 YEAR) 
  GROUP BY month_value
   ORDER BY month_value;`;
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      // Define an array of month names
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Create an array to store the result with counts for each month
      const resultArray = months.map((monthName) => {
        const matchingRow = data.find((row) => {
          // Input date in the format "YYYY-MM"
          const inputDate = row.month_value;

          // Create a JavaScript Date object from the input date
          const dateParts = inputDate.split("-");
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed, so subtract 1

          const jsDate = new Date(year, month);

          // Get the short month name
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const shortMonthName = monthNames[jsDate.getMonth()];

          return shortMonthName === monthName;
        });
        return {
          month: monthName,
          count: matchingRow ? matchingRow.count : 0, // Set count to 0 if no data for the month
        };
      });

      // Print or use the resultArray as needed
      const monthData = resultArray.map((data) => data.count);
      // console.log(resultArray.count);
      res.status(200).send(monthData);
    }
  });
};

export const turnToExeclFile = (req, res) => {
  // const { requestId } = req.body; // Replace with the actual request ID from req.params or req.body

  // Execute the SQL queries

  const sqlQueryRquestId = `SELECT request_id
  FROM finished_requests
 `;

  const sqlQuery = `
  SELECT 
  finished_requests.*,
  maintenance_requests.request_id,
  maintenance_requests.title,
  maintenance_requests.category,
  CONCAT(COALESCE(users.first_name, 'Preventive'), ' ', COALESCE(users.last_name, 'Maintenance')) AS requester_name,
  maintenance_requests.completion_date,
  users.phone,
  users.job,
  maintenance_requests.block_id
FROM 
  finished_requests
JOIN 
  maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
JOIN 
  technicians ON finished_requests.technician_id = technicians.technician_id
LEFT JOIN 
  users ON users.user_id = maintenance_requests.requester_id
WHERE  
  maintenance_requests.request_id = ?
ORDER BY 
  maintenance_requests.completion_date DESC;
;
  `;

  const technicianQuery = `
    SELECT 
      CONCAT(technicians.first_name, ' ', technicians.last_name) AS technician_full_name
    FROM 
      finished_requests
    JOIN 
      maintenance_requests ON finished_requests.request_id = maintenance_requests.request_id
    JOIN 
      technicians ON finished_requests.technician_id = technicians.technician_id
   LEFT JOIN 
      users ON users.user_id = maintenance_requests.requester_id
    WHERE  maintenance_requests.request_id=?
  `;

  const materialQuery = ` SELECT maintenance_request_materials.*,
  inventory.item_name FROM finished_requests
  JOIN maintenance_request_materials ON maintenance_request_materials.request_id = finished_requests.request_id 
  JOIN maintenance_requests ON maintenance_requests.request_id = finished_requests.request_id 
  LEFT JOIN inventory ON inventory.id=maintenance_request_materials.material_id 
  WHERE maintenance_requests.request_id =? And maintenance_request_materials.status="Closed" ;`;
  //   SELECT material_used.detail
  //   FROM finished_requests
  //   JOIN material_used ON material_used.work_id = finished_requests.finished_id
  //   JOIN maintenance_requests ON maintenance_requests.request_id = finished_requests.request_id
  //   WHERE maintenance_requests.request_id = ?;
  // `;
  // excelFile;
  db.query(sqlQueryRquestId, async (error, materialResults) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    // console.log(materialResults.length);
    // Return the combined results as JSON

    const dataObject = [];
    const requestIDArray = materialResults.map(async (e) => {
      let dataarray;

      dataarray = new Promise((resolve, reject) => {
        db.query(sqlQuery, [e.request_id], (error, results) => {
          if (error) {
            console.error("Error executing the query:", error);
            reject(error);
            res.status(500).send("Internal Server Error");
            return;
          }
          // console.log(results);
          const responseObj = {
            ...results?.[0],
          };
          // console.log(responseObj);
          db.query(
            technicianQuery,
            [e.request_id],
            (error, technicianResults) => {
              if (error) {
                console.error("Error executing the query:", error);
                res.status(500).send("Internal Server Error");
                return;
              }

              responseObj.technicianDetails = technicianResults
                .map((tech) => tech.technician_full_name)
                .join(", ");
              // console.log(responseObj);
              db.query(
                materialQuery,
                [e.request_id],
                (error, materialResults) => {
                  if (error) {
                    console.error("Error executing the query:", error);
                    res.status(500).send("Internal Server Error");
                    return;
                  }

                  responseObj.materialDetails = materialResults
                    .map((obj) => `${obj.item_name} (${obj.quantity_used})`)
                    .join(", ");
                  // Return the combined results as JSON
                  // dataObject = [...dataObject, responseObj];
                  // dataObject.push(responseObj);
                  // console.log(responseObj);
                  // console.log(dataObject);
                  resolve(responseObj);
                  // res.status(200).json(responseObj);
                }
              );
            }
          );
        });
      });

      return dataarray;
    });

    // console.log(requestIDArray);
    const ppp = await Promise.all([...requestIDArray]);
    // console.log(ppp);
    res.status(200).json(ppp);
    // return dataObject;
  });
  // Execute the queries in parallel
  // db.query(sqlQuery, [requestId], (error, results) => {
  //   if (error) {
  //     console.error("Error executing the query:", error);
  //     res.status(500).send("Internal Server Error");
  //     return;
  //   }
  //   // console.log(results);
  //   const responseObj = {
  //     ...results.?[0],
  //   };

  //   db.query(technicianQuery, [requestId], (error, technicianResults) => {
  //     if (error) {
  //       console.error("Error executing the query:", error);
  //       res.status(500).send("Internal Server Error");
  //       return;
  //     }

  //     responseObj.technicianDetails = technicianResults.map(tech => tech.technician_full_name).join(', ');

  //     db.query(materialQuery, [requestId], (error, materialResults) => {
  //       if (error) {
  //         console.error("Error executing the query:", error);
  //         res.status(500).send("Internal Server Error");
  //         return;
  //       }

  //       responseObj.materialDetails = materialResults.map(obj => `${obj.item_name} (${obj.quantity_used})`).join(', ');
  //       // Return the combined results as JSON

  //       console.log(responseObj);
  //       res.status(200).json(responseObj);
  //     });
  //   });
  // });
};
