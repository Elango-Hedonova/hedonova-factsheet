const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");
const { map } = require("./map");

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

async function map_details() {
  try {
    return map;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function portfolio(req, res) {
  Promise.all([pieChart(), map_details()])
    .then((values) => {
      const [pie_chart, map_details] = values;

      res.json({
        pie_chart,
        map_details,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = portfolio;
