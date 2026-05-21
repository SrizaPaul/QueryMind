require('dotenv').config();
const app = require('./src/app');
const authRoutes =
require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});