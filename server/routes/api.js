/**
 * Express REST API Routes
 * Endpoints for fleet overview, rankings, router details, filters, and copilot Q&A. okay then
 */
const express = require('express');
const router = express.Router();
const {
  getAllRouters,
  getWorstRouters,
  getRouterDetails,
  getFleetOverview
} = require('../services/dataLoader');
const { askCopilot, askCopilotStream } = require('../services/copilotService');

// 1. System Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Fleet Overview Statistics
router.get('/analytics/overview', (req, res) => {
  try {
    const overview = getFleetOverview();
    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. All Routers (with filtering, search, sorting)
router.get('/routers', (req, res) => {
  try {
    const filters = {
      building: req.query.building,
      firmware: req.query.firmware,
      status: req.query.status,
      cluster: req.query.cluster,
      search: req.query.search,
      sortBy: req.query.sortBy || 'health_asc'
    };

    const routers = getAllRouters(filters);
    res.json({
      count: routers.length,
      routers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Worst-10 Ranked Routers
router.get('/routers/rankings', (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const worstRouters = getWorstRouters(limit);
    res.json({
      limit,
      routers: worstRouters
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Router Detail View (Hourly telemetry + complaints)
router.get('/routers/:id', (req, res) => {
  try {
    const routerId = req.params.id;
    const details = getRouterDetails(routerId);
    if (!details) {
      return res.status(404).json({ error: `Router ${routerId} not found` });
    }
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. AI Copilot Diagnosis Endpoint
router.post('/copilot/ask', async (req, res) => {
  try {
    const { router_id, question } = req.body;
    if (!router_id) {
      return res.status(400).json({ error: 'Missing required field: router_id' });
    }

    const copilotAnswer = await askCopilot(router_id, question);
    res.json(copilotAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Real-Time AI Copilot SSE Diagnostic Stream Endpoint
router.get('/copilot/stream', async (req, res) => {
  try {
    const { router_id, question } = req.query;
    if (!router_id) {
      return res.status(400).json({ error: 'Missing required query param: router_id' });
    }
    await askCopilotStream(router_id, question, res);
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

router.post('/copilot/stream', async (req, res) => {
  try {
    const { router_id, question } = req.body;
    if (!router_id) {
      return res.status(400).json({ error: 'Missing required field: router_id' });
    }
    await askCopilotStream(router_id, question, res);
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

module.exports = router;
