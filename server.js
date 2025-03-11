const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = 'your-spreadsheet-id';
const SHEET_NAME = 'Sheet1'; // Название листа
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Учетные данные сервисного аккаунта
const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/your/service-account-key.json',
  scopes: SCOPES,
});

// Функция для записи данных в таблицу
async function writeToSheet(data) {
  const sheets = google.sheets({ version: 'v4', auth });
  const range = `${SHEET_NAME}!A1`; // Диапазон для записи

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: 'RAW',
    resource: {
      values: [data],
    },
  });

  return response.data;
}

// Роут для записи данных
app.post('/write-to-sheet', async (req, res) => {
  try {
    const data = req.body.data; // Данные из React Native
    const result = await writeToSheet(data);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error writing to sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
