const express = require("express");
const { google } = require("googleapis");
const keys = require("./credentials.json"); // Replace with your own credentials file path
const cors = require("cors");
const sheets = google.sheets("v4");
const app = express();
const { map } = require("./map");
require("dotenv").config();

app.use(cors());
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ text: "fact sheet" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
function isLastDayOfMonth(date) {
  // Create a new date object with the next day
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  // Check if the next day is the 1st day of the next month
  return nextDay.getMonth() !== date.getMonth();
}
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
    const range = "Sharpe updated monthly"; // Replace with your own sheet name
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
        .filter((el) => isLastDayOfMonth(new Date(el["Date"])))
        .map((el) => ({
          date: el["Date"],
          sharpe_ratio:
            Number(el["60 day Rolling Sharpe ratio"]).toFixed(2) * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/sharpe-chart-monthly", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Sharpe updated monthly"; // Replace with your own sheet name
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
        .filter((el) => isLastDayOfMonth(new Date(el["Date"])))
        .map((el) => ({
          date: el["Date"],
          sharpe_ratio:
            Number(el["60 day Rolling Sharpe ratio"]).toFixed(2) * 1,
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
    const range = "Beta monthly"; // Replace with your own sheet name
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

    const finalResult = result
      .filter((el) => el["Beta"])
      .map((el) => ({
        date: el["date"],
        average_beta: Number(el["Beta"]).toFixed(2) * 1,
      }));
    finalResult.shift();

    res.json(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/beta-chart-monthly", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Beta monthly"; // Replace with your own sheet name
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
        .filter((el) => el["Beta"])
        .map((el) => ({
          date: el["date"],
          beta: Number(el["Beta"]).toFixed(4) * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/standard-deviation-chart-old", async (req, res) => {
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
        .filter((el) => el["Hedonova SD"])
        .map((el) => ({
          date: el["date"],
          hedonova_sd: el["Hedonova SD"].replace("%", "") * 1,
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
        .filter((el) => el["SD Hedonova"])
        .filter((el) => isLastDayOfMonth(new Date(el["date"])))
        .map((el) => ({
          date: el["date"],
          hedonova_sd: el["SD Hedonova"].replace("%", "") * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/standard-deviation-chart-monthly", async (req, res) => {
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
        .filter((el) => el["SD Hedonova"])
        .filter((el) => isLastDayOfMonth(new Date(el["date"])))
        .map((el) => ({
          date: el["date"],
          hedonova_sd: el["SD Hedonova"],
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/alpha-chart-old", async (req, res) => {
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
          alpha: Number(el["Alpha"]).toFixed(4) * 1,
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
    const range = "Alpha monthly"; // Replace with your own sheet name
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
        .filter((el) => el["Alpha"])
        .map((el) => ({
          date: el["date"],
          alpha: el["Alpha"].replace("%", "") * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/alpha-chart-monthly", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Alpha monthly"; // Replace with your own sheet name
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
        .filter((el) => el["Alpha"])
        .map((el) => ({
          date: el["date"],
          alpha: el["Alpha"],
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
app.get("/api/factsheet/holding-details", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "holdings"; // Replace with your own sheet name
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
      result.map((el) => ({
        holdings: el["Holdings"],
        funds_in_percentage: el["% of funds"],
        sector: el["Sector"],
        market_value: el["Market value, $"],
        type: el["type"],
      }))
    );
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
    const filter = req.query.filter ? req.query.filter : "inception";
    if (filter === "inception") {
      res.json(
        result
          .filter((el) => el["VaR"])
          .map((el) => ({
            VaR: el["VaR"],
            Distribution: el["Percentage Distribution"],
          }))
      );
    }

    if (filter === "6m") {
      res.json(
        result
          .filter((el) => el["VaR - 6m"])
          .map((el) => ({
            VaR: el["VaR - 6m"],
            Distribution: el["Percentage Distribution - 6m"],
          }))
      );
    }

    if (filter === "12m") {
      res.json(
        result
          .filter((el) => el["VaR - 12m"])
          .map((el) => ({
            VaR: el["VaR - 12m"],
            Distribution: el["Percentage Distribution - 12m"],
          }))
      );
    }

    if (filter === "3y") {
      res.json(
        result
          .filter((el) => el["VaR - 3year"])
          .map((el) => ({
            VaR: el["VaR - 3year"],
            Distribution: el["Percentage Distribution - 3year"],
          }))
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/portfolio/information-ratio", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Information ratio"; // Replace with your own sheet name
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const header = rows[0];
    const values = rows.slice(1);
    const result = values
      .map((row) => {
        const obj = {};
        header.forEach((key, i) => {
          obj[key] = row[i];
        });
        return obj;
      })
      .filter((el) => el["day"] === "Sunday");
    const filter = req.query.filter ? req.query.filter : "inception";
    if (filter === "inception") {
      return res.json(
        result.map((el) => ({
          date: el["date"],
          "Information ratio": el["Information Ratio"] * 1,
        }))
      );
    }

    if (filter === "6m") {
      return res.json(
        result.slice(-26).map((el) => ({
          date: el["date"],
          "Information ratio": el["Information Ratio"] * 1,
        }))
      );
    }
    if (filter === "12m") {
      return res.json(
        result.slice(-52).map((el) => ({
          date: el["date"],
          "Information ratio": el["Information Ratio"] * 1,
        }))
      );
    }

    if (filter === "3y") {
      return res.json(
        result.slice(-156).map((el) => ({
          date: el["date"],
          "Information ratio": el["Information Ratio"] * 1,
        }))
      );
    }
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

    const filter = req.query.filter ? req.query.filter : "inception";

    if (filter === "6m") {
      return res.json(
        result
          .filter((el) => el["VaR - 6m"])
          .map((el) => ({
            VaR: el["VaR - 6m"],
            Distribution: el["Distribution - 6m"],
            "Average Var": el["Average Var - 6m"],
            CVAR: el["CVAR - 6m"],
            "Tail risk": el["tail risk - 6m"],
          }))
      );
    }

    if (filter === "inception" || "12m" || "3y") {
      return res.json(
        result
          .filter((el) => el["VaR - inception"])
          .map((el) => ({
            VaR: el["VaR - inception"],
            Distribution: el["Distribution - inception"],
            "Average Var": el["Average Var - inception"],
            CVAR: el["CVAR - inception"],
            "Tail risk": el["tail risk - inception"],
          }))
      );
    }

    // if (filter === "12m") {
    //   res.json(
    //     result
    //       .filter((el) => el["VaR - 12m"])
    //       .map((el) => ({
    //         VaR: el["VaR - 12m"],
    //         Distribution: el["Percentage Distribution - 12m"],
    //       }))
    //   );
    // }

    // if (filter === "3y") {
    //   res.json(
    //     result
    //       .filter((el) => el["VaR - 3year"])
    //       .map((el) => ({
    //         VaR: el["VaR - 3year"],
    //         Distribution: el["Percentage Distribution - 3year"],
    //       }))
    //   );
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/portfolio/liquidity", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Liquidity"; // Replace with your own sheet name
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

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/charts/rolling-correlation", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Rolling correlation - month end email"; // Replace with your own sheet name
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
        .filter((el) => el["60 day rolling correlation"])
        .map((el) => ({
          date: el["date"],
          rolling_correlation: Number(el["60 day rolling correlation"]),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/portfolio/annualized-return", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Annualized return"; // Replace with your own sheet name
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
app.get("/api/charts/aum", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1Dwowuh90mQnFX04VoN_SerQwQlKtmeRrjiKCjtdQdX8"; // Replace with your own spreadsheet ID
    const range = "aum"; // Replace with your own sheet name
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
        // .filter((el) => el["60 day rolling correlation"])
        .map((el) => ({
          date: el["Date"],
          aum_in_millions: el["Total AUM (in millions)"],
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/nav-change", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__mppmDmjV_xjscE7OpUo7AXUsrPvQJI84agdc9LtBQ"; // Replace with your own spreadsheet ID
    const range = "nav"; // Replace with your own sheet name
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

    const fiveDayArray = result.slice(-5).map((el) => el.nav);
    const oneMonthArray = result.slice(-30).map((el) => el.nav);
    const threeMonthArray = result.slice(-90).map((el) => el.nav);
    const sixMonthArray = result.slice(-180).map((el) => el.nav);
    const twelveMonthArray = result.slice(-365).map((el) => el.nav);
    const eighteenMonthArray = result.slice(-545).map((el) => el.nav);

    let fiveDayFirst = fiveDayArray[0] * 1;
    let fiveDayLast = fiveDayArray[fiveDayArray.length - 1] * 1;

    let oneMonthFirst = oneMonthArray[0] * 1;
    let oneMonthLast = oneMonthArray[oneMonthArray.length - 1] * 1;

    let threeMonthFirst = threeMonthArray[0] * 1;
    let threeMonthLast = threeMonthArray[threeMonthArray.length - 1] * 1;

    let sixMonthFirst = sixMonthArray[0] * 1;
    let sixMonthLast = sixMonthArray[sixMonthArray.length - 1] * 1;

    let twelveMonthFirst = twelveMonthArray[0] * 1;
    let twelveMonthLast = twelveMonthArray[twelveMonthArray.length - 1] * 1;

    let eighteenMonthFirst = eighteenMonthArray[0] * 1;
    let eighteenMonthLast =
      eighteenMonthArray[eighteenMonthArray.length - 1] * 1;

    const navChange = {
      fiveDays: {
        amount: (fiveDayLast - fiveDayFirst).toFixed(2) * 1,
        percentage:
          (((fiveDayLast - fiveDayFirst) / fiveDayFirst) * 100).toFixed(2) * 1,
      },
      oneMonth: {
        amount: (oneMonthLast - oneMonthFirst).toFixed(2) * 1,
        percentage:
          (((oneMonthLast - oneMonthFirst) / oneMonthFirst) * 100).toFixed(2) *
          1,
      },
      threeMonth: {
        amount: (threeMonthLast - threeMonthFirst).toFixed(2) * 1,
        percentage:
          (
            ((threeMonthLast - threeMonthFirst) / threeMonthFirst) *
            100
          ).toFixed(2) * 1,
      },
      sixMonth: {
        amount: (sixMonthLast - sixMonthFirst).toFixed(2) * 1,
        percentage:
          (((sixMonthLast - sixMonthFirst) / sixMonthFirst) * 100).toFixed(2) *
          1,
      },
      twelveMonth: {
        amount: (twelveMonthLast - twelveMonthFirst).toFixed(2) * 1,
        percentage:
          (
            ((twelveMonthLast - twelveMonthFirst) / twelveMonthFirst) *
            100
          ).toFixed(2) * 1,
      },
      eighteenMonth: {
        amount: (eighteenMonthLast - eighteenMonthFirst).toFixed(2) * 1,
        percentage:
          (
            ((eighteenMonthLast - eighteenMonthFirst) / eighteenMonthFirst) *
            100
          ).toFixed(2) * 1,
      },
    };
    res.json(navChange);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/charts/coinvestment-comparision", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "CI vs Hed"; // Replace with your own sheet name
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
        // .filter((el) => el["60 day rolling correlation"])
        .map((el) => ({
          date: el["Timeline"],
          coinvestment_pv: el["ci_pv"] * 1,
          sp_pv: el["sp_pv"] * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/map", async (req, res) => {
  try {
    res.json(map);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/factsheet/enterprise-value", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Enterprise value"; // Replace with your own sheet name
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
      result.map((el) => ({
        "Enterprise value": el["Enterprise value"],
        Hedonova: el["Hedonova"],
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/charts/hedvssp500", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__mppmDmjV_xjscE7OpUo7AXUsrPvQJI84agdc9LtBQ"; // Replace with your own spreadsheet ID
    const range = "nav"; // Replace with your own sheet name
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

    const finalResult = result
      .filter((el) => isLastDayOfMonth(new Date(el["date"])))
      .map((el) => ({
        date: el["date"],
        nav: el["nav"] * 1,
        sp500: el["sp500"] * 1,
      }));

    if (!isLastDayOfMonth(new Date(result[result.length - 1].date))) {
      finalResult.push({
        date: result[result.length - 1].date,
        nav: result[result.length - 1].nav * 1,
        sp500: result[result.length - 1].sp500 * 1,
      });
    }

    res.json(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/coinvestment/master-details", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1dmVvwy2BXY-jFKXxLgLOkb_b7pagUmoV709soW-7MK0"; // Replace with your own spreadsheet ID
    const range = "Master"; // Replace with your own sheet name
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
        .filter(
          (el) =>
            el["Email"] === req.query.email &&
            el["Co investment"] === req.query.name &&
            el["Payment status"] === req.query.status
        )
        .map((el) => ({
          ...el,
          amount: el["Amount ($)"].replace(/[\$,+]/g, "") * 1,
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
// Factsheet optimization
app.get("/api/factsheet/hedvssp500", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__mppmDmjV_xjscE7OpUo7AXUsrPvQJI84agdc9LtBQ"; // Replace with your own spreadsheet ID
    const range = "nav"; // Replace with your own sheet name
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

    const finalResult = result
      .filter((el) => isLastDayOfMonth(new Date(el["date"])))
      .map((el) => ({
        date: el["date"],
        nav: el["nav"] * 1,
        sp500: el["sp500"] * 1,
      }));

    if (!isLastDayOfMonth(new Date(result[result.length - 1].date))) {
      finalResult.push({
        date: result[result.length - 1].date,
        nav: result[result.length - 1].nav * 1,
        sp500: result[result.length - 1].sp500 * 1,
      });
    }

    res.json(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/performance-cards", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "Sheet1"; // Replace with your own sheet name
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

    const finalResult = result.map((el) => ({
      IRR: el["IRR"],
      "Alpha over S&P500": el["Alpha over S&P500"],
      CAGR: el["CAGR"],
    }));

    res.json(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/monthly-returns", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1lyg-_slZeBW8TJlpH9tPmbLwbWtFPEqMexrozx5iXv4"; // Replace with your own spreadsheet ID
    const range = "Sheet1"; // Replace with your own sheet name
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

    const finalResult = result.map((el) => ({
      month: el["month"],
      "hedonova monthly returns": el["hedonova monthly returns"],
      "s&p500 monthly returns": el["s&p500 monthly returns"],
    }));

    res.json(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/api/factsheet/annualized-return", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Annualized return"; // Replace with your own sheet name
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
app.get("/api/factsheet/aum", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1Dwowuh90mQnFX04VoN_SerQwQlKtmeRrjiKCjtdQdX8"; // Replace with your own spreadsheet ID
    const range = "aum"; // Replace with your own sheet name
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
        // .filter((el) => el["60 day rolling correlation"])
        .map((el) => ({
          date: el["Date"],
          aum_in_millions: el["Total AUM (in millions)"],
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
