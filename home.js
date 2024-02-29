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

async function pieChart() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1mXx-LSS03OrDnK3Dihk0bzZvSMAIyaroJDqtJ6XqAao"; // Replace with your own spreadsheet ID
    const range = "Automation"; // Replace with your own sheet name
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
      assetTitle: el["assetTitle"],
      assetValue: el["assetValue"],
      color: el["color"],
      colorHex: el["colorHex"],
      description: el["description"],
      link: el["link"],
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

async function home(req, res) {
  Promise.all([hedVsSp500(), pieChart(), performance_cards()])
    .then((values) => {
      const [hed_vs_sp500, pie_chart, performance_cards] = values;

      res.json({
        hed_vs_sp500,
        pie_chart,
        performance_cards,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = home;
