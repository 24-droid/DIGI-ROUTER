import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, CheckCircle2, AlertCircle, Wrench, RefreshCw, Cpu, Send, Check, Zap } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function CopilotPanel({ selectedRouterId, selectedRouterDetail }) {
  const [question, setQuestion] = useState('');
  const [copilotData, setCopilotData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appliedFix, setAppliedFix] = useState(false);

  useEffect(() => {
    if (selectedRouterId) {
      const defaultQ = `Why is router ${selectedRouterId} performing badly?`;
      setQuestion(defaultQ);
      setAppliedFix(false);
      handleAskCopilot(selectedRouterId, defaultQ);
    }
  }, [selectedRouterId]);

  const handleAskCopilot = async (routerId, qStr) => {
    if (!routerId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/copilot/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          router_id: routerId,
          question: qStr || question
        })
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setCopilotData(data);
    } catch (err) {
      setError(err.message || 'Failed to reach AI Copilot service');
    } finally {
      setLoading(false);
    }
  };

  const getFixBadge = (fixType) => {
    const styles = {
      'Firmware Update': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      'Relocate Router': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      'Replace Hardware': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      'User Education': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    };
    const cls = styles[fixType] || 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    return (
      <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${cls}`}>
        {fixType || 'No Hardware Fix Needed'}
      </span>
    );
  };

  return (
    <div className="card-linear p-5 flex flex-col h-full relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4 relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 via-dark-900 to-indigo-500/20 border border-cyan-500/30 rounded-2xl text-cyan-300 shadow-glow-cyan">
              <Bot className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">AI Copilot Diagnostic Engine</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                Grounded
              </span>
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Root-cause analysis citing real dataset figures & single recommended fix.
            </p>
          </div>
        </div>

        {selectedRouterId && (
          <div className="hidden sm:flex items-center gap-1.5 bg-dark-950/80 px-3 py-1.5 rounded-xl border border-white/[0.07] text-xs">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono font-bold text-cyan-300">{selectedRouterId}</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedRouterId) handleAskCopilot(selectedRouterId, question);
        }}
        className="mb-4 relative"
      >
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={selectedRouterId ? `Ask why ${selectedRouterId} is bad...` : 'Select a router first...'}
            disabled={!selectedRouterId || loading}
            className="w-full input-glass pl-4 pr-28 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!selectedRouterId || loading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl btn-glow text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-wider">Presets:</span>
          <button
            type="button"
            onClick={() => {
              if (selectedRouterId) {
                const q = `Why is router ${selectedRouterId} performing badly?`;
                setQuestion(q);
                handleAskCopilot(selectedRouterId, q);
              }
            }}
            className="px-2.5 py-1 rounded-lg bg-dark-950/80 hover:bg-cyan-500/10 text-cyan-400 border border-white/[0.07] hover:border-cyan-500/25 text-[10px] font-semibold transition-all"
          >
            "Why is router bad?"
          </button>
          <button
            type="button"
            onClick={() => {
              if (selectedRouterId) {
                const q = `What is the exact supporting evidence for router ${selectedRouterId}?`;
                setQuestion(q);
                handleAskCopilot(selectedRouterId, q);
              }
            }}
            className="px-2.5 py-1 rounded-lg bg-dark-950/80 hover:bg-indigo-500/10 text-indigo-400 border border-white/[0.07] hover:border-indigo-500/25 text-[10px] font-semibold transition-all"
          >
            "Show numbers evidence"
          </button>
        </div>
      </form>

      {/* Output */}
      <div className="flex-1 flex flex-col justify-between relative">
        {loading ? (
          <div className="p-8 rounded-2xl bg-dark-950/60 border border-white/[0.06] flex flex-col items-center justify-center min-h-[180px]">
            <div className="relative mb-4">
              <Bot className="w-10 h-10 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Bot className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <p className="text-xs font-bold text-slate-300">Evaluating telemetry for {selectedRouterId}...</p>
            <div className="flex gap-1 mt-3">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/25 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : copilotData ? (
          <div className="p-4 rounded-2xl bg-dark-950/70 border border-white/[0.07] space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900/80 border border-white/[0.06]">
              <span className="section-label text-slate-500">Single Action Fix</span>
              {getFixBadge(copilotData.fixType)}
            </div>

            <div>
              <h4 className="section-label text-cyan-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Root Cause Diagnosis
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed font-sans bg-dark-900/60 p-3.5 rounded-xl border border-white/[0.06]">
                {copilotData.diagnosis}
              </p>
            </div>

            <div>
              <h4 className="section-label text-indigo-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Supporting Dataset Evidence
              </h4>
              <ul className="space-y-1.5">
                {copilotData.evidence && copilotData.evidence.map((ev, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2.5 bg-dark-900/50 px-3 py-2 rounded-xl border border-white/[0.05] hover:border-cyan-500/15 transition-colors">
                    <span className="text-cyan-400 font-bold font-mono mt-0.5 shrink-0">›</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-indigo-950/30 border border-cyan-500/20 text-xs space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                Action Recommendation
              </div>
              <p className="text-slate-300 leading-relaxed">{copilotData.recommendedFix}</p>

              <button
                type="button"
                onClick={() => setAppliedFix(true)}
                className={`mt-1 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  appliedFix
                    ? 'bg-emerald-500 text-dark-950 shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)]'
                    : 'btn-glow text-white'
                }`}
              >
                {appliedFix ? <Check className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                {appliedFix ? 'Work Order Sent to IT Team' : 'Dispatch Action Work Order'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-dark-950/40 border border-white/[0.05] text-center">
            <Bot className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <p className="text-slate-500 text-xs">Select a router or ask a question to generate an AI diagnosis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
