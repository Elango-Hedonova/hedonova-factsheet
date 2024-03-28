const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");

async function hedVsSp500() {
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
      .filter((el, index) => index >= 1313 && index <= 1404)
      .map((el) => ({
        date: el["date"],
        nav: el["nav"] * 1,
        sp500: el["sp500"] * 1,
      }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function aum() {
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

    return result.map((el) => ({
      date: el["Date"],
      aum_in_millions: el["Total AUM (in millions)"],
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function asset_wise_returns() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1BWnFRumfJ6VdhE5n6AJGsMimSULxdLGgolZgjsL8XBE"; // Replace with your own spreadsheet ID
    const range = "Asset wise returns"; // Replace with your own sheet name
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
      "Asset class": el["Asset class"],
      "Allocation Q1 2024": el["Allocation Q1 2024"],
      "Returns Q1 2024": el["Returns Q1 2024"],
      "Portfolio contribution Q1 2024": el["Portfolio contribution Q1 2024"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function asset_performance() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1BWnFRumfJ6VdhE5n6AJGsMimSULxdLGgolZgjsL8XBE"; // Replace with your own spreadsheet ID
    const range = "Asset performance"; // Replace with your own sheet name
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
      "Asset class": el["Asset class"],
      "Returns for Q4 2023": el["Returns for Q4 2023"],
      "Returns for Q1 2024": el["Returns for Q1 2024"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function portfolio_allocation() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1BWnFRumfJ6VdhE5n6AJGsMimSULxdLGgolZgjsL8XBE"; // Replace with your own spreadsheet ID
    const range = "Portfolio allocation"; // Replace with your own sheet name
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
      "Asset class": el["Asset class"],
      colorHex: el["colorHex"],
      "Allocation for Q4 2023": el["Allocation for Q4 2023"],
      "Allocation for Q1 2024": el["Allocation for Q1 2024"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function currency_returns() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1BWnFRumfJ6VdhE5n6AJGsMimSULxdLGgolZgjsL8XBE"; // Replace with your own spreadsheet ID
    const range = "Currency returns"; // Replace with your own sheet name
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
      Currency: el["Currency"],
      "Currency contribution Q4 2023": el["Currency contribution Q4 2023"],
      "Currency contribution Q1 2024": el["Currency contribution Q1 2024"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function q1_2024(req, res) {
  Promise.all([
    hedVsSp500(),
    aum(),
    asset_wise_returns(),
    asset_performance(),
    portfolio_allocation(),
    currency_returns(),
  ])
    .then((values) => {
      const [
        hed_vs_sp500,
        aum,
        asset_wise_returns,
        asset_performance,
        portfolio_allocation,
        currency_returns,
      ] = values;

      res.json({
        hed_vs_sp500,
        aum,
        asset_wise_returns,
        asset_performance,
        portfolio_allocation,
        currency_returns,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = q1_2024;
