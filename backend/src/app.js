const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

// Import Routes
const queryRoutes = require('./routes/query.routes');

// Routes
app.use('/api', queryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);


// app.use('/api/query', queryRoutes);

module.exports = app;