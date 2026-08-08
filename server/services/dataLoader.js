/**
 * Data Loader & Storage Service
 * Ingests routers.csv, metrics.csv, and complaints.csv.
 * Maintains in-memory dataset + optional MongoDB sync.
 */

const fs = require('fs');
const path = require('path');
const { calculateRouterHealth } = require('./healthCalculator');

let routersMap = new Map();
let metricsMap = new Map();
let complaintsMap = new Map();
let processedRouters = [];
let isLoaded = false;

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function loadCSVs(dataDir) {
  console.log(`[DataLoader] Ingesting CSVs from ${dataDir}...`);

  routersMap.clear();
  metricsMap.clear();
  complaintsMap.clear();

  // 1. Read routers.csv
  const routersPath = path.join(dataDir, 'routers.csv');
  if (fs.existsSync(routersPath)) {
    const lines = fs.readFileSync(routersPath, 'utf-8').split(/\r?\n/).filter(Boolean);
    const headers = parseCSVLine(lines[0]);

    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length < headers.length) continue;
      const routerObj = {
        router_id: vals[0],
        model: vals[1],
        firmware_version: vals[2],
        building: vals[3],
        room: vals[4],
        user_type: vals[5],
        issue_date: vals[6]
      };
      routersMap.set(routerObj.router_id, routerObj);
    }
  }

  // 2. Read metrics.csv
  const metricsPath = path.join(dataDir, 'metrics.csv');
  if (fs.existsSync(metricsPath)) {
    const lines = fs.readFileSync(metricsPath, 'utf-8').split(/\r?\n/).filter(Boolean);
    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length < 8) continue;
      const router_id = vals[0];
      const metricObj = {
        router_id: vals[0],
        hour: vals[1],
        avg_speed_mbps: parseFloat(vals[2]) || 0,
        latency_ms: parseFloat(vals[3]) || 0,
        packet_loss_pct: parseFloat(vals[4]) || 0,
        disconnects: parseInt(vals[5], 10) || 0,
        connected_devices: parseInt(vals[6], 10) || 0,
        signal_dbm: parseFloat(vals[7]) || 0
      };

      if (!metricsMap.has(router_id)) {
        metricsMap.set(router_id, []);
      }
      metricsMap.get(router_id).push(metricObj);
    }
  }

  // 3. Read complaints.csv (or COMPLA~1.CSV)
  let complaintsPath = path.join(dataDir, 'complaints.csv');
  if (!fs.existsSync(complaintsPath)) {
    complaintsPath = path.join(dataDir, 'COMPLA~1.CSV');
  }

  if (fs.existsSync(complaintsPath)) {
    const lines = fs.readFileSync(complaintsPath, 'utf-8').split(/\r?\n/).filter(Boolean);
    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (vals.length < 4) continue;
      const router_id = vals[1];
      const ticketObj = {
        ticket_id: vals[0],
        router_id: vals[1],
        date: vals[2],
        complaint_text: vals[3] ? vals[3].replace(/^"|"$/g, '') : ''
      };

      if (!complaintsMap.has(router_id)) {
        complaintsMap.set(router_id, []);
      }
      complaintsMap.get(router_id).push(ticketObj);
    }
  }

  // Calculate health score for each router
  processedRouters = [];
  routersMap.forEach((router, router_id) => {
    const metrics = metricsMap.get(router_id) || [];
    const complaints = complaintsMap.get(router_id) || [];
    const healthResult = calculateRouterHealth(router, metrics, complaints);

    processedRouters.push({
      ...router,
      health_score: healthResult.healthScore,
      status: healthResult.status,
      metrics_summary: healthResult.metricsSummary,
      complaint_count: healthResult.complaintCount,
      failure_cluster: healthResult.failureCluster,
      metrics_count: metrics.length
    });
  });

  // Sort default by health_score ascending (worst score first)
  processedRouters.sort((a, b) => a.health_score - b.health_score);

  isLoaded = true;
  console.log(`[DataLoader] Ingested ${routersMap.size} routers, ${metricsMap.size} router metric sets, and ${complaintsMap.size} complaint sets.`);
  return processedRouters;
}

function getAllRouters(filters = {}) {
  let list = [...processedRouters];

  if (filters.building && filters.building !== 'All') {
    list = list.filter(r => r.building.toLowerCase() === filters.building.toLowerCase());
  }

  if (filters.firmware && filters.firmware !== 'All') {
    list = list.filter(r => r.firmware_version.toLowerCase() === filters.firmware.toLowerCase());
  }

  if (filters.status && filters.status !== 'All') {
    list = list.filter(r => r.status.toLowerCase() === filters.status.toLowerCase());
  }

  if (filters.cluster && filters.cluster !== 'All') {
    list = list.filter(r => r.failure_cluster.toLowerCase() === filters.cluster.toLowerCase());
  }

  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(r =>
      r.router_id.toLowerCase().includes(s) ||
      r.building.toLowerCase().includes(s) ||
      r.model.toLowerCase().includes(s) ||
      r.room.toString().includes(s)
    );
  }

  if (filters.sortBy === 'health_desc') {
    list.sort((a, b) => b.health_score - a.health_score);
  } else if (filters.sortBy === 'health_asc') {
    list.sort((a, b) => a.health_score - b.health_score);
  } else if (filters.sortBy === 'complaints_desc') {
    list.sort((a, b) => b.complaint_count - a.complaint_count);
  }

  return list;
}

function getWorstRouters(limit = 10) {
  return [...processedRouters].sort((a, b) => a.health_score - b.health_score).slice(0, limit);
}

function getRouterDetails(router_id) {
  const router = processedRouters.find(r => r.router_id === router_id);
  if (!router) return null;

  const metrics = metricsMap.get(router_id) || [];
  const complaints = complaintsMap.get(router_id) || [];

  return {
    ...router,
    hourly_metrics: metrics,
    complaints: complaints
  };
}

function getFleetOverview() {
  const totalRouters = processedRouters.length;
  const criticalCount = processedRouters.filter(r => r.status === 'Critical').length;
  const warningCount = processedRouters.filter(r => r.status === 'Warning').length;
  const healthyCount = processedRouters.filter(r => r.status === 'Healthy').length;

  const avgHealthScore = Math.round(
    processedRouters.reduce((acc, r) => acc + r.health_score, 0) / (totalRouters || 1)
  );

  let totalComplaints = 0;
  complaintsMap.forEach(list => totalComplaints += list.length);

  // Buildings list
  const buildings = Array.from(new Set(processedRouters.map(r => r.building))).sort();
  // Firmware versions list
  const firmwares = Array.from(new Set(processedRouters.map(r => r.firmware_version))).sort();
  // Failure clusters list
  const clusters = Array.from(new Set(processedRouters.map(r => r.failure_cluster))).sort();

  return {
    totalRouters,
    criticalCount,
    warningCount,
    healthyCount,
    avgHealthScore,
    totalComplaints,
    buildings,
    firmwares,
    clusters
  };
}

module.exports = {
  loadCSVs,
  getAllRouters,
  getWorstRouters,
  getRouterDetails,
  getFleetOverview
};
