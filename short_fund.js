const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");

async function portfolio_holdings() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1PTTlxO8qzOxuxZ5gAvyJ0q9yZMaBeog2oGmlHxo04tw"; // Replace with your own spreadsheet ID
    const range = "Portfolio holdings"; // Replace with your own sheet name
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
      colorHex: el["colorHex"],
      description: el["description"],
    }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function short_fund(req, res) {
  Promise.all([portfolio_holdings()])
    .then((values) => {
      const [portfolio_holdings] = values;

      res.json({
        portfolio_holdings,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = short_fund;
