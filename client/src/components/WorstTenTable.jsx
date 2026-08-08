import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Search, Sparkles, XCircle, TrendingDown, Ticket } from 'lucide-react';

export default function WorstTenTable({
  routers = [],
  selectedRouterId,
  onSelectRouter,
  buildings = [],
  firmwares = [],
  filters,
  onFilterChange,
  loading
}) {
  const [sortBy, setSortBy] = useState('health_asc');

  const getStatusBadge = (status, score) => {
    if (status === 'Critical' || score < 50) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 glow-badge">
          <AlertCircle className="w-2.5 h-2.5" />
          Critical ({score})
        </span>
      );
    }
    if (status === 'Warning' || score < 75) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-2.5 h-2.5" />
          Warning ({score})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        <CheckCircle2 className="w-2.5 h-2.5" />
        Healthy ({score})
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score < 50) return 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]';
    if (score < 75) return 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
    return 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
  };

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-rose-500/30 to-rose-600/10 text-rose-300 font-extrabold font-mono border border-rose-500/50 text-xs shadow-glow-rose">
          #1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/25 to-amber-600/10 text-amber-300 font-bold font-mono border border-amber-500/40 text-xs">
          #2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-300 font-semibold font-mono border border-amber-500/30 text-xs">
          #3
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.04] text-slate-500 font-mono text-xs border border-white/[0.06]">
        #{rank}
      </span>
    );
  };

  const sortedRouters = [...routers].sort((a, b) => {
    if (sortBy === 'health_asc') return a.health_score - b.health_score;
    if (sortBy === 'complaints_desc') return b.complaint_count - a.complaint_count;
    return 0;
  });

  return (
    <div className="card-linear p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/25">
              <TrendingDown className="w-4 h-4 text-rose-400" />
            </div>
            <h2 className="text-base font-extrabold text-white tracking-tight">Worst-10 Fleet Rankings</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/25">
              Score Ranked
            </span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1.5 pl-9">
            Click any router row to load telemetry charts & copilot diagnosis.
          </p>
        </div>

        <div className="flex items-center gap-0.5 bg-dark-950/80 p-1 rounded-xl border border-white/[0.07] text-xs">
          <button
            onClick={() => setSortBy('health_asc')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 ${
              sortBy === 'health_asc'
                ? 'btn-glow text-white font-bold'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            Worst First
          </button>
          <button
            onClick={() => setSortBy('complaints_desc')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 ${
              sortBy === 'complaints_desc'
                ? 'bg-indigo-600 text-white font-bold shadow-glow-indigo'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Ticket className="w-3 h-3" />
            Most Tickets
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3 bg-dark-950/50 p-2.5 rounded-xl border border-white/[0.06]">
        <div className="relative flex-1 min-w-[130px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search ID, building..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full input-glass pl-9 pr-7 py-1.5 text-xs text-slate-100 placeholder-slate-600"
          />
          {filters.search && (
            <button onClick={() => onFilterChange({ ...filters, search: '' })} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={filters.building || 'All'}
          onChange={(e) => onFilterChange({ ...filters, building: e.target.value })}
          className="input-glass px-3 py-1.5 text-xs text-slate-300 cursor-pointer"
        >
          <option value="All">All Buildings</option>
          {buildings.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={filters.firmware || 'All'}
          onChange={(e) => onFilterChange({ ...filters, firmware: e.target.value })}
          className="input-glass px-3 py-1.5 text-xs text-slate-300 cursor-pointer"
        >
          <option value="All">All Firmware</option>
          {firmwares.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] rounded-xl border border-white/[0.06] bg-dark-950/60">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-dark-900/90 text-slate-500 font-bold uppercase tracking-wider sticky top-0 backdrop-blur-xl z-10">
              <th className="py-3 px-3 text-center w-10">#</th>
              <th className="py-3 px-3">Router ID</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Firmware</th>
              <th className="py-3 px-3">Health Score</th>
              <th className="py-3 px-3 text-center">Tickets</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-slate-300 font-mono">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                    <span className="text-slate-500 font-sans text-xs">Loading rankings dataset...</span>
                  </div>
                </td>
              </tr>
            ) : sortedRouters.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center text-slate-500 font-sans text-xs">
                  No routers match current filters.
                </td>
              </tr>
            ) : (
              sortedRouters.map((router, index) => {
                const isSelected = router.router_id === selectedRouterId;
                return (
                  <tr
                    key={router.router_id}
                    onClick={() => onSelectRouter(router.router_id)}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected ? 'table-row-selected text-white' : 'table-row-glow'
                    }`}
                  >
                    <td className="py-3 px-3 text-center">{getRankBadge(index + 1)}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      <span className="font-mono text-cyan-300 text-xs">{router.router_id}</span>
                      <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-md bg-white/[0.05] text-slate-500 font-sans font-medium border border-white/[0.06]">
                        {router.model}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-300">
                      <span className="font-semibold text-slate-200">{router.building}</span>
                      <span className="text-slate-600 text-[10px] block">Room {router.room}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        ['v1.9', 'v2.0', 'v3.0'].includes(router.firmware_version)
                          ? 'bg-amber-950/50 text-amber-300 border border-amber-700/40'
                          : 'bg-white/[0.05] text-slate-400 border border-white/[0.06]'
                      }`}>
                        {router.firmware_version}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 font-bold font-mono text-slate-100">{router.health_score}</span>
                        <div className="flex-1 h-1.5 bg-dark-900 rounded-full overflow-hidden w-16 border border-white/[0.06]">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getScoreColor(router.health_score)}`}
                            style={{ width: `${router.health_score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      {router.complaint_count > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-bold font-mono text-[10px] border border-indigo-500/25">
                          {router.complaint_count}
                        </span>
                      ) : (
                        <span className="text-slate-700 font-mono text-[10px]">0</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRouter(router.router_id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center gap-1 ml-auto ${
                          isSelected
                            ? 'btn-glow text-white shadow-glow-cyan'
                            : 'bg-white/[0.05] text-cyan-400 hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/30'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {isSelected ? 'Active' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
