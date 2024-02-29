const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");

async function monthly_returns() {
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

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function performance_cards() {
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

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function performance(req, res) {
  Promise.all([monthly_returns(), performance_cards()])
    .then((values) => {
      const [monthly_returns, performance_cards] = values;

      res.json({
        monthly_returns,
        performance_cards,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = performance;
