const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
require('dotenv').config();

const app = express();

// Allow multiple origins for development
const allowedOrigins = [
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501' // Add your current frontend origin
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) or if the origin is in the allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  