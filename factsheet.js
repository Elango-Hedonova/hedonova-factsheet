const { google } = require("googleapis");
const sheets = google.sheets("v4");
const keys = require("./credentials.json");
const { map } = require("./map");

function isLastDayOfMonth(date) {
  // Create a new date object with the next day
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  // Check if the next day is the 1st day of the next month
  return nextDay.getMonth() !== date.getMonth();
}
async function header_section() {
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
    return outputObj;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function fund_facts() {
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

    return outputObj;
  } catch (error) {
    return error;
  }
}

async function fees_minimum() {
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

    return outputObj;
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

async function enterprise_value() {
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

    return result.map((el) => ({
      "Enterprise value": el["Enterprise value"],
      Hedonova: el["Hedonova"],
    }));
  } catch (error) {
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

async function map_details() {
  try {
    return map;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function holding_details() {
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

    return result.map((el) => ({
      holdings: el["Holdings"],
      funds_in_percentage: el["% of funds"],
      sector: el["Sector"],
      market_value: el["Market value, $"],
      type: el["type"],
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function daily_returns() {
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

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function weighted_exposure() {
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

    return final;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// async function sharpe_chart() {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: keys,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const client = await auth.getClient();
//     const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
//     const range = "Sharpe updated monthly"; // Replace with your own sheet name
//     const response = await sheets.spreadsheets.values.get({
//       auth: client,
//       spreadsheetId,
//       range,
//     });

//     const rows = response.data.values;
//     const header = rows[0];
//     const values = rows.slice(1);
//     const result = values.map((row) => {
//       const obj = {};
//       header.forEach((key, i) => {
//         obj[key] = row[i];
//       });
//       return obj;
//     });

//     return result
//       .filter((el) => el["60 day Rolling Sharpe ratio"])
//       .filter((el) => isLastDayOfMonth(new Date(el["Date"])))
//       .map((el) => ({
//         date: el["Date"],
//         sharpe_ratio: Number(el["60 day Rolling Sharpe ratio"]).toFixed(2) * 1,
//       }));
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

// async function beta_chart() {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: keys,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const client = await auth.getClient();
//     const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
//     const range = "Beta monthly"; // Replace with your own sheet name
//     const response = await sheets.spreadsheets.values.get({
//       auth: client,
//       spreadsheetId,
//       range,
//     });

//     const rows = response.data.values;
//     const header = rows[0];
//     const values = rows.slice(1);
//     const result = values.map((row) => {
//       const obj = {};
//       header.forEach((key, i) => {
//         obj[key] = row[i];
//       });
//       return obj;
//     });

//     const finalResult = result
//       .filter((el) => el["Beta"])
//       .map((el) => ({
//         date: el["date"],
//         average_beta: Number(el["Beta"]).toFixed(2) * 1,
//       }));
//     finalResult.shift();

//     return finalResult;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

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
      .map((el) => ({
        date: el["Date"],
        sharpe_ratio: Number(el["90 day Rolling Sharpe ratio"]).toFixed(3) * 1,
      }));
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function beta_chart() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Beta Latest"; // Replace with your own sheet name
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
      .filter((el) => el["90 day rolling Beta"])
      .map((el) => ({
        date: el["date"],
        average_beta: Number(el["90 day rolling Beta"]).toFixed(2) * 1,
      }));

    return finalResult;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// async function standard_deviation_chart() {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: keys,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const client = await auth.getClient();
//     const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
//     const range = "Standard deviation"; // Replace with your own sheet name
//     const response = await sheets.spreadsheets.values.get({
//       auth: client,
//       spreadsheetId,
//       range,
//     });

//     const rows = response.data.values;
//     const header = rows[0];
//     const values = rows.slice(1);
//     const result = values.map((row) => {
//       const obj = {};
//       header.forEach((key, i) => {
//         obj[key] = row[i];
//       });
//       return obj;
//     });

//     return result
//       .filter((el) => el["Hedonova SD"])
//       .map((el) => ({
//         date: el["date"],
//         hedonova_sd: el["Hedonova SD"].replace("%", "") * 1,
//       }));
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

async function standard_deviation_chart() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keys,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "19GRNwJ8_u3UBbIGrxsTtij27FXt6N-JGh1RFlmSRWic"; // Replace with your own spreadsheet ID
    const range = "Standard deviation latest"; // Replace with your own sheet name
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
      .filter((el) => el["SD Hedonova"])
      .map((el) => ({
        date: el["date"],
        hedonova_sd: el["SD Hedonova"].replace("%", "") * 1,
      }));
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

async function closing_price() {
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

    return outputObj;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function nav_change() {
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
    return navChange;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function factsheet(req, res) {
  Promise.all([
    header_section(),
    fund_facts(),
    fees_minimum(),
    enterprise_value(),
    hedVsSp500(),
    performance_cards(),
    monthly_returns(),
    annualized_returns(),
    aum(),
    map_details(),
    holding_details(),
    daily_returns(),
    weighted_exposure(),
    sharpe_chart(),
    alpha_chart(),
    beta_chart(),
    standard_deviation_chart(),
    closing_price(),
    nav_change(),
  ])
    .then((values) => {
      const [
        headerSection,
        fund_facts,
        fees,
        enterprise,
        hed_vs_sp500,
        performance_cards,
        monthly_returns,
        annualized_returns,
        aum,
        map_details,
        holding_details,
        daily_returns,
        weighted_exposure,
        sharpe_chart,
        alpha_chart,
        beta_chart,
        standard_deviation_chart,
        closing_price,
        nav_change,
      ] = values;

      res.json({
        headerSection,
        fund_facts,
        fees,
        enterprise,
        hed_vs_sp500,
        performance_cards,
        monthly_returns,
        annualized_returns,
        aum,
        map_details,
        holding_details,
        daily_returns,
        weighted_exposure,
        sharpe_chart,
        alpha_chart,
        beta_chart,
        standard_deviation_chart,
        closing_price,
        nav_change,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "system error" });
    });
}

module.exports = factsheet;
