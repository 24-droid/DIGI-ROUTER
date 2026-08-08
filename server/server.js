/**
 * Express Server Entry Point
 * Campus Router Health 360 Backend
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { loadCSVs } = require('./services/dataLoader');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ingest CSV dataset on boot
const dataDir = path.join(__dirname, '../data');
loadCSVs(dataDir);

// API Routes
app.use('/api', apiRoutes);

// Serve static frontend in production if built
const clientBuildPath = path.join(__dirname, '../client/dist');
if (require('fs').existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Campus Router Health 360 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
