const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = require('./src/app');
const authRoutes =
require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

app.use(cors({
  origin: 'query-mind-8y85gqm22-srizapaul.vercel.app',
  credentials: true
}));

const PORT =
  process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('QueryMind Backend Running');
});

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});