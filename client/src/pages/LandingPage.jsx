import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wifi,
  ArrowRight,
  Activity,
  Bot,
  ShieldCheck,
  Zap,
  BarChart3,
  Server,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  Cpu,
  Brain,
  Wrench,
  Sparkles,
  ChevronRight,
  Radio
} from 'lucide-react';
import NetworkHeroVisual from '../components/NetworkHeroVisual';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExploreDashboard = () => {
    navigate('/dashboard');
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      id: 'ai-diagnosis',
      title: 'AI Root-Cause Diagnosis',
      desc: 'Generates instant, data-grounded diagnostic explanations for high CPU, thermal throttling, packet drops, and user helpdesk complaints.',
      icon: Brain,
      color: 'from-cyan-500/20 via-slate-900 to-indigo-500/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      badge: 'AI Copilot Core',
      stats: '100% Grounded Explanations',
    },
    {
      id: 'health-scoring',
      title: 'Router Health Scoring',
      desc: 'Algorithmic 0–100 health index evaluation aggregating CPU load, RAM utilization, drop rates, ambient temperature, and active tickets.',
      icon: ShieldCheck,
      color: 'from-emerald-500/20 via-slate-900 to-cyan-500/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badge: 'Real-time Indexing',
      stats: 'Multi-Metric Algorithm',
    },
    {
      id: 'predictive-detection',
      title: 'Predictive Failure Detection',
      desc: 'Proactively flags critical routers prone to impending failure, allowing campus IT teams to swap or service hardware before outages occur.',
      icon: Zap,
      color: 'from-amber-500/20 via-slate-900 to-rose-500/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      badge: 'Proactive Alerting',
      stats: 'Early Outage Prevention',
    },
    {
      id: 'fleet-analytics',
      title: 'Fleet-Wide Analytics',
      desc: 'Comprehensive interactive workspace with multi-dimensional filtering by building location, firmware versions, and telemetry health rankings.',
      icon: BarChart3,
      color: 'from-indigo-500/20 via-slate-900 to-purple-500/10',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
      badge: 'Campus Overview',
      stats: 'Multi-Building Telemetry',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'CSV / Telemetry Ingestion',
      desc: 'Raw router telemetry logs, CPU metrics, temperature, and helpdesk complaint logs are ingested.',
      icon: FileSpreadsheet,
      accent: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-500/30',
    },
    {
      step: '02',
      title: 'Telemetry Analysis',
      desc: 'Automated processing parses packet loss rates, thermal thresholds, and hardware uptime metrics.',
      icon: Activity,
      accent: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-500/30',
    },
    {
      step: '03',
      title: 'Dynamic Health Scoring',
      desc: 'Each campus router receives a 0–100 score classifying status as Healthy, Warning, or Critical.',
      icon: ShieldCheck,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-500/30',
    },
    {
      step: '04',
      title: 'AI Root-Cause Diagnosis',
      desc: 'AI Copilot correlates complaint logs with device metrics to identify precise failure bottlenecks.',
      icon: Bot,
      accent: 'text-purple-400',
      bg: 'bg-purple-950/40 border-purple-500/30',
    },
    {
      step: '05',
      title: 'Recommended Action',
      desc: 'Generates prescriptive remediation steps: relocate router, upgrade firmware, or replace hardware.',
      icon: Wrench,
      accent: 'text-rose-400',
      bg: 'bg-rose-950/40 border-rose-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-[#040608] text-slate-100 font-sans relative overflow-hidden">
      {/* Background Mesh and Grid */}
      <div className="fixed inset-0 bg-mesh opacity-90 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid opacity-60 pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="relative z-30 border-b border-white/[0.08] backdrop-blur-xl bg-slate-950/60 sticky top-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/25 via-slate-900 to-indigo-600/25 border border-cyan-500/30 text-cyan-300 shadow-glow-cyan">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block leading-tight">
                Campus Router <span className="text-gradient-cyan">Health 360</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
                Enterprise Network Intelligence
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#fleet-status" className="hover:text-cyan-400 transition-colors">Live Architecture</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleExploreDashboard}
              className="btn-glow px-5 py-2.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2 group"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-16 lg:pb-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs text-slate-200 backdrop-blur-md shadow-glow-cyan">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono font-semibold tracking-wide text-emerald-300">60 Routers • Live Telemetry</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Campus Router <br />
                <span className="text-gradient-cyan">Health 360</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-cyan-300/90 font-mono tracking-tight">
                AI-Powered Network Health & Predictive Diagnostics
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                Real-time telemetry monitoring, automated health scoring, predictive failure detection, and data-grounded AI root-cause diagnosis for university router infrastructure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleExploreDashboard}
                className="btn-glow px-7 py-3.5 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-3 group shadow-glow-cyan"
              >
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>Explore Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={handleScrollToHowItWorks}
                className="card-interactive px-7 py-3.5 rounded-2xl font-semibold text-base text-slate-200 hover:text-white flex items-center justify-center gap-2.5 border border-white/10"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Metrics HUD */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 font-mono">
              <div>
                <span className="text-xs text-slate-400 block">Fleet Coverage</span>
                <span className="text-xl sm:text-2xl font-bold text-white">100%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">AI Accuracy</span>
                <span className="text-xl sm:text-2xl font-bold text-cyan-400">99.4%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Downtime Saved</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">~85%</span>
              </div>
            </div>
          </div>

          {/* Right Column 3D Visual */}
          <div className="lg:col-span-6 relative">
            <NetworkHeroVisual />
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section id="features" className="relative z-10 py-16 sm:py-20 border-t border-white/[0.08] bg-slate-950/40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Network Monitoring Architecture
            </h2>
            <p className="text-slate-400 text-base">
              Built with precision telemetry algorithms and AI diagnostics designed for high-density campus router deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`card-landing-feature p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between group ${item.borderColor}`}
                >
                  {/* Subtle top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 ${item.iconColor}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white/[0.05] text-slate-400 border border-white/5">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{item.stats}</span>
                    <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Flow Section */}
      <section id="how-it-works" className="relative z-10 py-20 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
            Diagnostic Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Campus Router Health 360 Works
          </h2>
          <p className="text-slate-400 text-base">
            End-to-end data pipeline transforming raw router telemetry into actionable remediation recommendations.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-rose-500/30 transform -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {workflowSteps.map((stepItem, index) => {
              const StepIcon = stepItem.icon;
              return (
                <div
                  key={stepItem.step}
                  className="card-linear p-5 rounded-2xl flex flex-col justify-between relative group hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-black font-mono ${stepItem.accent}`}>
                        {stepItem.step}
                      </span>
                      <div className={`p-2.5 rounded-xl border ${stepItem.bg}`}>
                        <StepIcon className={`w-5 h-5 ${stepItem.accent}`} />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">
                      {stepItem.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>STAGE {index + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 opacity-60" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-linear p-8 sm:p-14 rounded-3xl relative overflow-hidden text-center border border-cyan-500/30 shadow-2xl">
          <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              Ready For Deployment
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Turn Network Data Into <br />
              <span className="text-gradient-cyan">Actionable Intelligence</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Empower your IT operations team with instant health metrics, predictive outage prevention, and grounded AI copilot guidance today.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleExploreDashboard}
                className="btn-glow px-9 py-4 rounded-2xl font-bold text-base text-white flex items-center gap-3 shadow-glow-cyan group"
              >
                <span>Launch Health 360 Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-slate-950/80 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white">Campus Router Health 360</span>
              <p className="text-xs text-slate-500">AI-Powered Network Diagnostics Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL SYSTEMS: ONLINE</span>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            © 2026 Campus Router Health 360 · All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
