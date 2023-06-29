const express = require("express");
const { google } = require("googleapis");
const keys = require("./credentials.json"); // Replace with your own credentials file path
const sheets = google.sheets("v4");
const app = express();
require("dotenv").config();

// Define the API route to fetch data from the Google Sheet
app.get("/api/factsheet/header-section", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Sheet2"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const headers = rows[0];
    const values = rows[1];
    const outputObj = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const value = values[i];
      const properties = header.split(".");

      let currentObj = outputObj;
      for (let j = 0; j < properties.length - 1; j++) {
        const property = properties[j];
        if (!currentObj[property]) {
          currentObj[property] = {};
        }
        currentObj = currentObj[property];
      }

      const lastProperty = properties[properties.length - 1];
      currentObj[lastProperty] = value;
    }

    res.json(outputObj);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
