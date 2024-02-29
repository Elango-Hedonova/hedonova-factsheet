const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");

async function information_ratio(filter = "inception") {
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
    // const filter = req.query.filter ? req.query.filter : "inception";
    if (filter === "inception") {
      return result.map((el) => ({
        date: el["date"],
        "Information ratio": el["Information Ratio"] * 1,
      }));
    }

    if (filter === "6m") {
      return result.slice(-26).map((el) => ({
        date: el["date"],
        "Information ratio": el["Information Ratio"] * 1,
      }));
    }
    if (filter === "12m") {
      return result.slice(-52).map((el) => ({
        date: el["date"],
        "Information ratio": el["Information Ratio"] * 1,
      }));
    }

    if (filter === "3y") {
      return result.slice(-156).map((el) => ({
        date: el["date"],
        "Information ratio": el["Information Ratio"] * 1,
      }));
    }
  } catch (error) {
    return error;
  }
}

async function value_at_risk(filter = "inception") {
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
    // const filter = req.query.filter ? req.query.filter : "inception";
    if (filter === "inception") {
      return result
        .filter((el) => el["VaR"])
        .map((el) => ({
          VaR: el["VaR"],
          Distribution: el["Percentage Distribution"],
        }));
    }

    if (filter === "6m") {
      return result
        .filter((el) => el["VaR - 6m"])
        .map((el) => ({
          VaR: el["VaR - 6m"],
          Distribution: el["Percentage Distribution - 6m"],
        }));
    }

    if (filter === "12m") {
      return result
        .filter((el) => el["VaR - 12m"])
        .map((el) => ({
          VaR: el["VaR - 12m"],
          Distribution: el["Percentage Distribution - 12m"],
        }));
    }

    if (filter === "3y") {
      return result
        .filter((el) => el["VaR - 3year"])
        .map((el) => ({
          VaR: el["VaR - 3year"],
          Distribution: el["Percentage Distribution - 3year"],
        }));
    }
  } catch (error) {
    return error;
  }
}
async function liquidity() {
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

    return result[0];
  } catch (error) {
    return error;
  }
}
async function tail_risk(filter = "inception") {
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

    // const filter = req.query.filter ? req.query.filter : "inception";

    if (filter === "6m") {
      return result
        .filter((el) => el["VaR - 6m"])
        .map((el) => ({
          VaR: el["VaR - 6m"],
          Distribution: el["Distribution - 6m"],
          "Average Var": el["Average Var - 6m"],
          CVAR: el["CVAR - 6m"],
          "Tail risk": el["tail risk - 6m"],
        }));
    }

    if (filter === "inception" || "12m" || "3y") {
      return result
        .filter((el) => el["VaR - inception"])
        .map((el) => ({
          VaR: el["VaR - inception"],
          Distribution: el["Distribution - inception"],
          "Average Var": el["Average Var - inception"],
          CVAR: el["CVAR - inception"],
          "Tail risk": el["tail risk - inception"],
        }));
    }
  } catch (error) {
    return error;
  }
}

async function portfolio_risk_metrics(req, res) {
  Promise.all([
    information_ratio(req.query.filter),
    liquidity(),
    value_at_risk(req.query.filter),
    tail_risk(req.query.filter),
  ])
    .then((values) => {
      const [information_ratio, liquidity, value_at_risk, tail_risk] = values;

      res.json({
        information_ratio,
        liquidity,
        value_at_risk,
        tail_risk,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = portfolio_risk_metrics;
