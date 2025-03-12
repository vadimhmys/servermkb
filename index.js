const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

// Обработка GET-запроса на корневой путь
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Обработка GET-запроса с параметром
app.get('/greet/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

// Обработка POST-запроса
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', data });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
