const express = require("express");
const { google } = require("googleapis");
const keys = require("./credentials.json"); // Replace with your own credentials file path
const sheets = google.sheets("v4");
const app = express();
require("dotenv").config();

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ text: "fact sheet" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
// Define the API route to fetch data from the Google Sheet
app.get("/api/factsheet/header-section", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Header section"; // Replace with your own sheet name
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

app.get("/api/factsheet/fund-facts", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Fund facts"; // Replace with your own sheet name
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

app.get("/api/factsheet/fees-minimums", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Fees & minimums"; // Replace with your own sheet name
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

app.get("/api/factsheet/weighted-exposure", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Weighted exposure"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });
    const spreadsheetId2 = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range2 = "Weighted exposure section"; // Replace with your own sheet name
    const response2 = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: spreadsheetId2,
      range: range2,
    });
    const rows2 = response2.data.values;
    const headers2 = rows2[0];
    const values2 = rows2[1];
    const outputObj = {};

    for (let i = 0; i < headers2.length; i++) {
      const header = headers2[i];
      const value = values2[i];
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

    // res.json(outputObj);
    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    const final = {
      section: outputObj.section,
      data: result,
    };

    res.json(final);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/closing-price", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Closing price"; // Replace with your own sheet name
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

app.get("/api/factsheet/sharpe-chart", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Sharpe updated"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => el["60 day Rolling Sharpe ratio"])
        .map((el) => ({
          date: el["Date"],
          sharpe_ratio: Number(el["60 day Rolling Sharpe ratio"]),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/beta-chart", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Beta updated"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => el["14 day moving average"])
        .map((el) => ({
          date: el["date"],
          average_beta: Number(el["14 day moving average"]),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/standard-deviation-chart", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Standard deviation"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => el["Hedonova Std Deviation (60 day moving average)"])
        .map((el) => ({
          date: el["date"],
          hedonova: el["Hedonova Std Deviation (60 day moving average)"],
          "s&p500": el["S&P 500 Std Deviation (60 day moving average)"],
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/alpha-chart", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Alpha updated"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => !isNaN(el["Alpha"]))
        .map((el) => ({
          date: el["date"],
          alpha: Number(el["Alpha"]),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/hedonova-daily-returns", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Hedonova daily returns"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/portfolio/value-at-risk", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Value at risk"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => el["Sequence"])
        .map((el) => ({
          sequence: Number(el["Sequence"]),
          Distribution: Number(el["Distribution"]),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/portfolio/tail-risk", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Tail risk"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values.map((row) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    res.json(
      result
        .filter((el) => el["Sequence"])
        .map((el) => ({
          sequence: el["Sequence"],
          distribution: el["Distribution"],
          VaR: el["Var"],
          CVaR: el["CVAR"],
        }))
    );
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
