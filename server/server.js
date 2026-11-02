const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/problems', require('./routes/problem.routes'));
app.use('/api/submissions', require('./routes/submission.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/progress', require('./routes/progress.routes'));
app.use('/api/roadmap', require('./routes/roadmap.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
