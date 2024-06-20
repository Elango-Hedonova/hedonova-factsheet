const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");

function isLastDayOfMonth(date) {
  // Create a new date object with the next day
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  // Check if the next day is the 1st day of the next month
  return nextDay.getMonth() !== date.getMonth();
}

async function annualized_returns() {
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

    return outputObj;
  } catch (error) {
    console.error(error);
    return error;
  }
}

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
async function inter_asset_correlation() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Inter asset correlation"; // Replace with your own sheet name
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
      date: el["date"],
      value: el["value"] * 1,
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function rolling_correlation() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Rolling correlation latest"; // Replace with your own sheet name
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
      .filter((el) => el["monthly average"])
      .map((el) => ({
        date: el["date"],
        "14 day moving average": el["monthly average"] * 1,
      }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function alpha_chart() {
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

    return result
      .filter((el) => el["Alpha"])
      .map((el) => ({
        date: el["date"],
        alpha: el["Alpha"].replace("%", "") * 1,
      }));
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function sharpe_chart() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Rolling sharpe latest"; // Replace with your own sheet name
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

    return result
      .filter((el) => el["90 day Rolling Sharpe ratio"])
      .filter((el) => isLastDayOfMonth(new Date(el["Date"])))
      .map((el) => ({
        date: el["Date"],
        sharpe_ratio: Number(el["90 day Rolling Sharpe ratio"]).toFixed(3) * 1,
      }));
  } catch (error) {
    console.error(error);
    return error;
  }
}
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

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function correlation_cards() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1__uoCp5ZIQKpY2YmhPdpqr5CjOXo-8-3I1nP4MSc_YQ"; // Replace with your own spreadsheet ID
    const range = "low correlation cards"; // Replace with your own sheet name
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
      "Standard deviation": el["Standard deviation"],
      Beta: el["Beta"],
      Correlation: el["Correlation"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function performance(req, res) {
  Promise.all([
    monthly_returns(),
    performance_cards(),
    inter_asset_correlation(),
    rolling_correlation(),
    alpha_chart(),
    sharpe_chart(),
    hedVsSp500(),
    annualized_returns(),
    correlation_cards(),
  ])
    .then((values) => {
      const [
        monthly_returns,
        performance_cards,
        inter_asset_correlation,
        rolling_correlation,
        alpha_chart,
        sharpe_chart,
        hedVsSp500,
        annualized_returns,
        correlation_cards,
      ] = values;

      res.json({
        monthly_returns,
        performance_cards,
        inter_asset_correlation,
        rolling_correlation,
        alpha_chart,
        sharpe_chart,
        hedVsSp500,
        annualized_returns,
        correlation_cards,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = performance;
