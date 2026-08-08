import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, CheckCircle2, AlertCircle, Wrench, ShieldCheck, HelpCircle, RefreshCw, Cpu, Send, Check } from 'lucide-react';

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
      const res = await fetch('/api/copilot/ask', {
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
    switch (fixType) {
      case 'Firmware Update':
        return <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">Firmware Update</span>;
      case 'Relocate Router':
        return <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Relocate Router</span>;
      case 'Replace Hardware':
        return <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">Replace Hardware</span>;
      case 'User Education':
        return <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">User Education</span>;
      default:
        return <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">No Hardware Fix Needed</span>;
    }
  };

  return (
    <div className="card-linear p-5 flex flex-col h-full bg-slate-900/90">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-indigo-500/20 border border-cyan-500/30 rounded-xl text-cyan-300 shadow-md">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white tracking-tight">AI Copilot Diagnostic Engine</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Grounded
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Root-cause analysis citing real dataset figures & single recommended fix.
            </p>
          </div>
        </div>

        {selectedRouterId && (
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs">
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
        className="mb-4"
      >
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={selectedRouterId ? `Ask why ${selectedRouterId} is bad...` : 'Select a router first...'}
            disabled={!selectedRouterId || loading}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-3.5 pr-24 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!selectedRouterId || loading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs">
          <span className="text-slate-500 text-[10px]">Presets:</span>
          <button
            type="button"
            onClick={() => {
              if (selectedRouterId) {
                const q = `Why is router ${selectedRouterId} performing badly?`;
                setQuestion(q);
                handleAskCopilot(selectedRouterId, q);
              }
            }}
            className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[10px] font-semibold"
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
            className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-slate-800 text-[10px] font-semibold"
          >
            "Show numbers evidence"
          </button>
        </div>
      </form>

      {/* Output */}
      <div className="flex-1 flex flex-col justify-between">
        {loading ? (
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center text-slate-400 animate-pulse min-h-[180px]">
            <Bot className="w-8 h-8 text-cyan-400 mb-2 animate-spin" />
            <p className="text-xs font-bold text-slate-200">Evaluating telemetry figures for {selectedRouterId}...</p>
          </div>
        ) : error ? (
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : copilotData ? (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-bold uppercase">Single Action Fix:</span>
              {getFixBadge(copilotData.fixType)}
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Root Cause Diagnosis
              </h4>
              <p className="text-slate-200 text-xs leading-relaxed font-sans bg-slate-900/70 p-3 rounded-lg border border-slate-800">
                {copilotData.diagnosis}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Supporting Dataset Evidence (Real Numbers)
              </h4>
              <ul className="space-y-1">
                {copilotData.evidence && copilotData.evidence.map((ev, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold font-mono text-xs">•</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-xs space-y-1.5">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                Action Recommendation:
              </div>
              <p className="text-slate-200">{copilotData.recommendedFix}</p>

              <button
                type="button"
                onClick={() => setAppliedFix(true)}
                className={`mt-2 w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  appliedFix
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white'
                }`}
              >
                {appliedFix ? <Check className="w-3.5 h-3.5" /> : <Wrench className="w-3.5 h-3.5" />}
                {appliedFix ? 'Work Order Sent to IT Team' : 'Dispatch Action Work Order'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-900 text-center text-slate-500 text-xs">
            Select a router or ask a question above to generate an AI diagnosis.
          </div>
        )}
      </div>
    </div>
  );
}
