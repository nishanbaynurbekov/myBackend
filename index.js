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

// Убактылуу массив (эгер базага сактала элек болсо)
let posts = [];

// 1. Постторду алуу (GET)
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 2. Жаңы пост түзүү (POST)
app.post('/api/posts', (req, res) => {
  const { authorTag, specialty, isExpertPost, category, text } = req.body;

  const newPost = {
    id: Date.now().toString(),
    authorTag,
    specialty,
    isExpertPost,
    category,
    text,
    createdAt: new Date()
  };

  posts.unshift(newPost); // Башына кошуу
  res.status(201).json(newPost);
});


app.listen(PORT, () => {
  console.log(`Сервер ${PORT}-портто иштеп баштады...`);
});