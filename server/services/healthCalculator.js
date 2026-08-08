/**
 * Health Calculator Service
 * Computes deterministic health scores (0-100), metric aggregates,
 * failure pattern clusters, and status classifications for routers.
 */

function calculateRouterHealth(router, metrics = [], complaints = []) {
  if (!metrics || metrics.length === 0) {
    return {
      healthScore: 100,
      status: 'Healthy',
      metricsSummary: {
        avgSpeedMbps: 0,
        avgLatencyMs: 0,
        avgPacketLossPct: 0,
        totalDisconnects: 0,
        avgSignalDbm: 0,
        avgDevices: 0,
        badHoursCount: 0,
        totalHours: 0
      },
      complaintCount: complaints.length,
      failureCluster: 'Normal'
    };
  }

  const totalHours = metrics.length;
  let totalSpeed = 0;
  let totalLatency = 0;
  let totalPacketLoss = 0;
  let totalDisconnects = 0;
  let totalSignal = 0;
  let totalDevices = 0;

  const speeds = [];
  const latencies = [];
  const packetLosses = [];
  const signals = [];

  let badHoursCount = 0;

  metrics.forEach(m => {
    const speed = Number(m.avg_speed_mbps || 0);
    const latency = Number(m.latency_ms || 0);
    const loss = Number(m.packet_loss_pct || 0);
    const disconnects = Number(m.disconnects || 0);
    const signal = Number(m.signal_dbm || 0);
    const devices = Number(m.connected_devices || 0);

    totalSpeed += speed;
    totalLatency += latency;
    totalPacketLoss += loss;
    totalDisconnects += disconnects;
    totalSignal += signal;
    totalDevices += devices;

    speeds.push(speed);
    latencies.push(latency);
    packetLosses.push(loss);
    signals.push(signal);

    // Bad hour condition: speed < 20 OR latency > 80 OR packetLoss > 3 OR disconnects > 2 OR signal < -78
    if (speed < 20 || latency > 80 || loss > 3.0 || disconnects >= 2 || signal < -78) {
      badHoursCount++;
    }
  });

  const avgSpeed = totalSpeed / totalHours;
  const avgLatency = totalLatency / totalHours;
  const avgPacketLoss = totalPacketLoss / totalHours;
  const avgSignal = totalSignal / totalHours;
  const avgDevices = totalDevices / totalHours;

  // Compute median latency
  const sortedLatencies = [...latencies].sort((a, b) => a - b);
  const medianLatency = sortedLatencies[Math.floor(totalHours / 2)];

  // Compute 90th percentile latency
  const p90Latency = sortedLatencies[Math.floor(totalHours * 0.9)] || sortedLatencies[totalHours - 1];

  // Component Scores (Total 100 points)

  // 1. Speed Score (25 points)
  let speedScore = 0;
  if (avgSpeed >= 50) speedScore = 25;
  else if (avgSpeed <= 10) speedScore = 0;
  else speedScore = ((avgSpeed - 10) / 40) * 25;

  // 2. Latency Score (20 points)
  let latencyScore = 0;
  if (medianLatency <= 25) latencyScore = 20;
  else if (medianLatency >= 100) latencyScore = 0;
  else latencyScore = 20 - ((medianLatency - 25) / 75) * 20;

  // 3. Packet Loss Score (20 points)
  let packetLossScore = 0;
  if (avgPacketLoss <= 0.5) packetLossScore = 20;
  else if (avgPacketLoss >= 5.0) packetLossScore = 0;
  else packetLossScore = 20 - ((avgPacketLoss - 0.5) / 4.5) * 20;

  // 4. Disconnects Score (20 points)
  let disconnectsScore = Math.max(0, 20 - (totalDisconnects * 2.5));

  // 5. Signal Score (15 points)
  let signalScore = 0;
  if (avgSignal >= -60) signalScore = 15;
  else if (avgSignal <= -85) signalScore = 0;
  else signalScore = 15 - ((Math.abs(avgSignal) - 60) / 25) * 15;

  // Sustained penalty: if more than 30% of hours are bad hours, apply extra penalty
  const badHoursRatio = badHoursCount / totalHours;
  const sustainedPenalty = badHoursRatio > 0.3 ? (badHoursRatio - 0.3) * 30 : 0;

  // Complaint Penalty (3 points per ticket, max 15 points)
  const complaintPenalty = Math.min(15, complaints.length * 3);

  let rawHealth = speedScore + latencyScore + packetLossScore + disconnectsScore + signalScore - sustainedPenalty - complaintPenalty;
  const healthScore = Math.max(0, Math.min(100, Math.round(rawHealth)));

  let status = 'Healthy';
  if (healthScore < 50) status = 'Critical';
  else if (healthScore < 75) status = 'Warning';

  // Determine failure pattern cluster for bonus feature
  let failureCluster = 'Normal / Healthy';
  if (healthScore < 75) {
    if (avgSignal < -75) {
      failureCluster = 'Dead Zone / Weak Signal';
    } else if (totalDisconnects >= 10 || (router.firmware_version && ['v1.9', 'v2.0', 'v3.0'].includes(router.firmware_version) && totalDisconnects > 5)) {
      failureCluster = 'Outdated Firmware Disconnects';
    } else if (avgDevices >= 15 && avgLatency > 60) {
      failureCluster = 'High Density Congestion';
    } else if (avgPacketLoss > 2.0 || totalDisconnects > 12) {
      failureCluster = 'Hardware / Power Instability';
    } else if (complaints.length > 0 && healthScore >= 65) {
      failureCluster = 'User Environment / Configuration';
    } else {
      failureCluster = 'General Performance Degradation';
    }
  }

  return {
    healthScore,
    status,
    metricsSummary: {
      avgSpeedMbps: Math.round(avgSpeed * 10) / 10,
      avgLatencyMs: Math.round(avgLatency * 10) / 10,
      medianLatencyMs: Math.round(medianLatency * 10) / 10,
      p90LatencyMs: Math.round(p90Latency * 10) / 10,
      avgPacketLossPct: Math.round(avgPacketLoss * 100) / 100,
      totalDisconnects,
      avgSignalDbm: Math.round(avgSignal * 10) / 10,
      avgDevices: Math.round(avgDevices * 10) / 10,
      badHoursCount,
      totalHours
    },
    complaintCount: complaints.length,
    failureCluster
  };
}

module.exports = {
  calculateRouterHealth
};
