import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Layers, PieChart as PieIcon, Cpu, AlertTriangle, ShieldCheck, Activity, Building2 } from 'lucide-react';

export default function BonusAnalyticsPanel({ overview, routers = [], onSelectCluster }) {
  if (!overview) return null;

  const { healthyCount = 0, warningCount = 0, criticalCount = 0, buildings = [] } = overview;

  const distributionData = [
    { name: 'Healthy (Score >= 75)', value: healthyCount, color: '#10b981' },
    { name: 'Warning (Score 50-74)', value: warningCount, color: '#f59e0b' },
    { name: 'Critical (Score < 50)', value: criticalCount, color: '#f43f5e' }
  ];

  // Compute cluster frequencies from current loaded routers
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

  return (
    <div className="mt-8 glass-panel rounded-3xl p-6 border-slate-800 shadow-2xl space-y-6 bg-gradient-to-b from-slate-900/90 to-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Fleet Failure Clustering & Campus Distribution</h2>
            <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Bonus Feature Set
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Automated cluster grouping for fleet failure pattern detection and overall campus health distribution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Campus Health Distribution */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            Campus Fleet Health Distribution
          </h3>
          <div className="h-56 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#030712" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 pr-4 text-xs font-bold shrink-0">
              <div className="flex items-center gap-2.5 text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-900/40">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
                Healthy: {healthyCount}
              </div>
              <div className="flex items-center gap-2.5 text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-900/40">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
                Warning: {warningCount}
              </div>
              <div className="flex items-center gap-2.5 text-rose-400 bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-900/40">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm"></span>
                Critical: {criticalCount}
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Failure Pattern Clusters */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Failure Pattern Clusters (Automated Grouping)
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 10 }} width={130} />
                <Tooltip
                  formatter={(value, name, item) => [`${value} Routers`, item.payload.fullName]}
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
