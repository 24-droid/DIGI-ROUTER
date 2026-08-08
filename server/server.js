/**
 * Express Server Entry Point
 * Campus Router Health 360 Backend
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
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
  // SPA fallback — regex avoids Express 5 path-to-regexp wildcard breakage
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Campus Router Health 360 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`   Another server instance is likely still running.`);
    console.error(`\n   Fix (PowerShell):`);
    console.error(`   netstat -ano | findstr :${PORT}`);
    console.error(`   taskkill /PID <PID> /F\n`);
    process.exit(1);
  }
  throw err;
});
