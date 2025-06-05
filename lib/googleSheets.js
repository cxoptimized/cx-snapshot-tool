const { google } = require('googleapis');

module.exports = async ({ clientName, linkedin, reviewResponse, aiAgent }) => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDS_JSON),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[new Date().toISOString(), clientName, linkedin, reviewResponse, aiAgent]]
    }
  });
};