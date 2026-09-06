const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Сервер ийгиликтүү иштеп жатат!');
});

app.listen(PORT, () => {
  console.log(`Сервер ${PORT}-портто иштеп баштады...`);
});