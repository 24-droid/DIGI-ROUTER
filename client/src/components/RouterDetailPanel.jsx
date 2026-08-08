import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Activity, Signal, MessageSquare, HardDrive, MapPin, UserCheck, Loader2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-950/95 border border-white/10 rounded-xl p-3 text-[11px] shadow-card backdrop-blur-xl">
      <p className="text-slate-400 font-mono mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export default function RouterDetailPanel({ routerDetail, loading }) {
  const [activeTab, setActiveTab] = useState('speed');

  if (loading) {
    return (
      <div className="card-linear p-6 h-full flex flex-col items-center justify-center text-slate-500 min-h-[350px]">
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
          </div>
          <div className="absolute inset-0 rounded-2xl animate-ping bg-cyan-500/5" />
        </div>
        <p className="text-xs font-semibold text-slate-400">Loading router telemetry history...</p>
        <p className="text-[10px] text-slate-600 mt-1">Fetching hourly metrics & complaint logs</p>
      </div>
    );
  }

  if (!routerDetail) {
    return (
      <div className="card-linear p-6 h-full flex flex-col items-center justify-center text-slate-500 min-h-[350px]">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3">
          <Activity className="w-7 h-7 text-slate-700" />
        </div>
        <p className="text-xs font-semibold text-slate-400">Select a router from rankings</p>
        <p className="text-[10px] text-slate-600 mt-1">Telemetry charts will appear here</p>
      </div>
    );
  }

  const {
    router_id,
    model,
    firmware_version,
    building,
    room,
    user_type,
    health_score,
    status,
    metrics_summary,
    hourly_metrics = [],
    complaints = []
  } = routerDetail;

  const chartData = hourly_metrics.map(m => {
    const hourLabel = m.hour ? m.hour.split('T')[1] || m.hour : '00:00';
    return {
      time: hourLabel,
      speed: m.avg_speed_mbps,
      latency: m.latency_ms,
      packetLoss: m.packet_loss_pct,
      disconnects: m.disconnects,
      signal: m.signal_dbm,
      devices: m.connected_devices
    };
  });

  const scoreColor = health_score < 50 ? '#f43f5e' : health_score < 75 ? '#f59e0b' : '#10b981';

  const metricCards = metrics_summary ? [
    { label: 'Avg Speed', value: metrics_summary.avgSpeedMbps, unit: 'Mbps', color: 'cyan', border: 'border-t-cyan-400', text: 'text-cyan-300' },
    { label: 'Avg Latency', value: metrics_summary.avgLatencyMs, unit: 'ms', color: 'indigo', border: 'border-t-indigo-400', text: 'text-indigo-300' },
    { label: 'Packet Loss', value: `${metrics_summary.avgPacketLossPct}%`, unit: '', color: 'rose', border: 'border-t-rose-400', text: metrics_summary.avgPacketLossPct > 1.0 ? 'text-rose-400' : 'text-emerald-300' },
    { label: 'Total Disconnects', value: metrics_summary.totalDisconnects, unit: 'drops', color: 'amber', border: 'border-t-amber-400', text: metrics_summary.totalDisconnects > 5 ? 'text-rose-400' : 'text-slate-200' },
  ] : [];

  return (
    <div className="card-linear p-5 flex flex-col gap-5">
      {/* Detail Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-dark-900 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shadow-glow-cyan">
            {router_id.replace('R-', '')}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-extrabold font-mono text-white tracking-tight">{router_id}</h2>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/[0.05] text-cyan-300 border border-white/[0.08]">
                {model}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {building} — Room {room}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <UserCheck className="w-3 h-3 text-indigo-400" />
                {user_type}
              </span>
              <span className="flex items-center gap-1 font-mono text-amber-300 font-semibold">
                <HardDrive className="w-3 h-3 text-amber-400" />
                FW: {firmware_version}
              </span>
            </div>
          </div>
        </div>

        {/* Health Score */}
        <div className="flex items-center gap-3 bg-dark-950/70 px-4 py-2.5 rounded-2xl border border-white/[0.07]">
          <div className="text-right">
            <span className="section-label text-slate-500 block mb-0.5">Health Score</span>
            <span className="text-xl font-extrabold font-mono" style={{ color: scoreColor }}>
              {health_score} <span className="text-slate-600 text-xs font-normal">/ 100</span>
            </span>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: `conic-gradient(${scoreColor} ${health_score * 3.6}deg, rgba(255,255,255,0.06) 0deg)` }}
          >
            <div className="w-7 h-7 rounded-full bg-dark-950 flex items-center justify-center">
              <span className="text-[9px] font-bold font-mono" style={{ color: scoreColor }}>{status?.[0]}</span>
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            status === 'Critical' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
            status === 'Warning' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
            'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
          }`}>
            {status}
          </div>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      {metrics_summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {metricCards.map((m) => (
            <div key={m.label} className={`p-3 rounded-xl bg-dark-950/60 border border-white/[0.06] border-t-2 ${m.border}`}>
              <span className="section-label text-slate-500 block mb-1">{m.label}</span>
              <span className={`text-base font-extrabold font-mono ${m.text}`}>
                {m.value}
                {m.unit && <span className="text-[10px] text-slate-600 ml-0.5">{m.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Tabs */}
      <div className="flex items-center gap-1.5 bg-dark-950/50 p-1 rounded-xl border border-white/[0.06] w-fit">
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
            activeTab === 'speed' ? 'tab-active text-cyan-300' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Throughput & Latency
        </button>
        <button
          onClick={() => setActiveTab('drops')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
            activeTab === 'drops' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-glow-rose' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Signal className="w-3.5 h-3.5" />
          Drops & Loss
        </button>
      </div>

      {/* Chart */}
      <div className="h-60 w-full bg-dark-950/50 p-3 rounded-xl border border-white/[0.06]">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'speed' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" stroke="#06b6d4" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#818cf8" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Area yAxisId="left" type="monotone" dataKey="speed" name="Speed (Mbps)" stroke="#06b6d4" fillOpacity={1} fill="url(#speedGrad)" strokeWidth={2} dot={false} />
              <Area yAxisId="right" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#818cf8" fillOpacity={1} fill="url(#latencyGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" stroke="#f43f5e" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
              <Line yAxisId="left" type="monotone" dataKey="packetLoss" name="Packet Loss (%)" stroke="#f43f5e" strokeWidth={2} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="disconnects" name="Disconnects" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2, fill: '#f59e0b' }} />
              <Line yAxisId="right" type="monotone" dataKey="signal" name="Signal (dBm)" stroke="#10b981" strokeWidth={1.5} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Complaints */}
      <div className="bg-dark-950/50 p-4 rounded-xl border border-white/[0.06]">
        <h3 className="section-label text-indigo-400 flex items-center gap-2 mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          Linked Helpdesk Tickets ({complaints.length})
        </h3>
        {complaints.length === 0 ? (
          <p className="text-xs text-slate-600 italic py-3 text-center">No user complaints logged for this router.</p>
        ) : (
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {complaints.map(c => (
              <div key={c.ticket_id} className="p-2.5 rounded-xl bg-dark-900/80 border border-white/[0.06] flex items-start justify-between gap-2 text-xs hover:border-indigo-500/20 transition-colors">
                <div className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/25 shrink-0">
                    {c.ticket_id}
                  </span>
                  <span className="text-slate-300 font-medium">{c.complaint_text}</span>
                </div>
                <span className="text-slate-600 text-[10px] font-mono shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
