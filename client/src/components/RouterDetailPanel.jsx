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
import { Activity, Signal, AlertOctagon, MessageSquare, HardDrive, MapPin, UserCheck, Calendar, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function RouterDetailPanel({ routerDetail, loading }) {
  const [activeTab, setActiveTab] = useState('speed');

  if (loading) {
    return (
      <div className="card-linear p-6 animate-pulse h-full flex flex-col items-center justify-center text-slate-500 min-h-[350px]">
        <Activity className="w-8 h-8 text-cyan-400 animate-spin mb-2" />
        <p className="text-xs font-semibold text-slate-400">Loading router telemetry history...</p>
      </div>
    );
  }

  if (!routerDetail) {
    return (
      <div className="card-linear p-6 h-full flex flex-col items-center justify-center text-slate-500 min-h-[350px]">
        <Activity className="w-10 h-10 text-slate-700 mb-2" />
        <p className="text-xs font-semibold text-slate-400">Select a router from rankings to view telemetry charts.</p>
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

  return (
    <div className="card-linear p-5 flex flex-col gap-5 bg-slate-900/80">
      {/* Detail Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-lg">
            {router_id.replace('R-', '')}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold font-mono text-white tracking-tight">{router_id}</h2>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                {model}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {building} — Room {room}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                {user_type}
              </span>
              <span className="flex items-center gap-1 font-mono text-amber-300 font-semibold text-[11px]">
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                FW: {firmware_version}
              </span>
            </div>
          </div>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Health Score</span>
            <span className={`text-xl font-extrabold font-mono ${health_score < 50 ? 'text-rose-400' : health_score < 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {health_score} <span className="text-slate-500 text-xs font-normal">/ 100</span>
            </span>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            status === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
            status === 'Warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {status}
          </div>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      {metrics_summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border-t-2 border-t-cyan-400">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Speed</span>
            <span className="text-base font-extrabold font-mono text-cyan-300">{metrics_summary.avgSpeedMbps} <span className="text-[10px] text-slate-500">Mbps</span></span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border-t-2 border-t-indigo-400">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Latency</span>
            <span className="text-base font-extrabold font-mono text-indigo-300">{metrics_summary.avgLatencyMs} <span className="text-[10px] text-slate-500">ms</span></span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border-t-2 border-t-rose-400">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Packet Loss</span>
            <span className={`text-base font-extrabold font-mono ${metrics_summary.avgPacketLossPct > 1.0 ? 'text-rose-400' : 'text-emerald-300'}`}>
              {metrics_summary.avgPacketLossPct}%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border-t-2 border-t-amber-400">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Disconnects</span>
            <span className={`text-base font-extrabold font-mono ${metrics_summary.totalDisconnects > 5 ? 'text-rose-400' : 'text-slate-200'}`}>
              {metrics_summary.totalDisconnects} drops
            </span>
          </div>
        </div>
      )}

      {/* Chart View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'speed' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Throughput & Latency
        </button>
        <button
          onClick={() => setActiveTab('drops')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'drops' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Signal className="w-3.5 h-3.5" />
          Drops & Loss
        </button>
      </div>

      {/* Metric Chart */}
      <div className="h-60 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'speed' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" stroke="#06b6d4" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#818cf8" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area yAxisId="left" type="monotone" dataKey="speed" name="Speed (Mbps)" stroke="#06b6d4" fillOpacity={1} fill="url(#speedGrad)" strokeWidth={2} />
              <Area yAxisId="right" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#818cf8" fillOpacity={1} fill="url(#latencyGrad)" strokeWidth={2} />
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" stroke="#f43f5e" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="packetLoss" name="Packet Loss (%)" stroke="#f43f5e" strokeWidth={2} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="disconnects" name="Disconnects" stroke="#f59e0b" strokeWidth={2} dot={true} />
              <Line yAxisId="right" type="monotone" dataKey="signal" name="Signal (dBm)" stroke="#10b981" strokeWidth={1.5} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* User Complaints */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2 mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          Linked Helpdesk Tickets ({complaints.length})
        </h3>
        {complaints.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2 text-center">No user complaints logged for this router.</p>
        ) : (
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {complaints.map(c => (
              <div key={c.ticket_id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                    {c.ticket_id}
                  </span>
                  <span className="text-slate-200 font-medium">{c.complaint_text}</span>
                </div>
                <span className="text-slate-500 text-[10px] font-mono shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
