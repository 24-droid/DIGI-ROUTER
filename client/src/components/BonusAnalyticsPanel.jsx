import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Layers, PieChart as PieIcon, Sparkles } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="bg-dark-950/95 border border-white/10 rounded-xl px-3 py-2 text-[11px] shadow-card backdrop-blur-xl">
      <p className="text-slate-300 font-semibold">{data.name || data.payload?.fullName}</p>
      <p className="font-mono font-bold mt-0.5" style={{ color: data.color || data.payload?.fill }}>
        {data.value} Routers
      </p>
    </div>
  );
};

export default function BonusAnalyticsPanel({ overview, routers = [], onSelectCluster }) {
  if (!overview) return null;

  const { healthyCount = 0, warningCount = 0, criticalCount = 0 } = overview;

  const distributionData = [
    { name: 'Healthy (Score >= 75)', value: healthyCount, color: '#10b981' },
    { name: 'Warning (Score 50-74)', value: warningCount, color: '#f59e0b' },
    { name: 'Critical (Score < 50)', value: criticalCount, color: '#f43f5e' }
  ];

  const clusterCounts = {};
  routers.forEach(r => {
    const c = r.failure_cluster || 'Normal / Healthy';
    clusterCounts[c] = (clusterCounts[c] || 0) + 1;
  });

  const clusterChartData = Object.keys(clusterCounts).map(k => ({
    name: k.length > 20 ? k.substring(0, 18) + '...' : k,
    fullName: k,
    count: clusterCounts[k]
  })).sort((a, b) => b.count - a.count);

  const legendItems = [
    { label: 'Healthy', count: healthyCount, color: 'emerald', dot: 'bg-emerald-500', bg: 'bg-emerald-950/40 border-emerald-500/25', text: 'text-emerald-400' },
    { label: 'Warning', count: warningCount, color: 'amber', dot: 'bg-amber-500', bg: 'bg-amber-950/40 border-amber-500/25', text: 'text-amber-400' },
    { label: 'Critical', count: criticalCount, color: 'rose', dot: 'bg-rose-500', bg: 'bg-rose-950/40 border-rose-500/25', text: 'text-rose-400' },
  ];

  return (
    <div className="mt-8 card-linear p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/25">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">Fleet Failure Clustering & Campus Distribution</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Bonus Feature Set
            </span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1.5 pl-11">
            Automated cluster grouping for fleet failure pattern detection and overall campus health distribution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col">
          <h3 className="section-label text-slate-300 mb-4 flex items-center gap-2">
            <PieIcon className="w-3.5 h-3.5 text-emerald-400" />
            Campus Fleet Health Distribution
          </h3>
          <div className="h-56 w-full flex items-center gap-4">
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={5}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 flex-1">
              {legendItems.map(item => (
                <div key={item.label} className={`flex items-center gap-2.5 ${item.text} ${item.bg} px-3 py-2 rounded-xl border text-xs font-bold`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${item.dot} shadow-sm`} />
                  {item.label}: {item.count}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col">
          <h3 className="section-label text-slate-300 mb-4 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Failure Pattern Clusters
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" stroke="#475569" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={130} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value, name, item) => [`${value} Routers`, item.payload.fullName]}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="count" fill="url(#barGrad)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
