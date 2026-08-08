import React, { useState, useEffect } from 'react';
import HeaderOverview from './components/HeaderOverview';
import WorstTenTable from './components/WorstTenTable';
import RouterDetailPanel from './components/RouterDetailPanel';
import CopilotPanel from './components/CopilotPanel';
import BonusAnalyticsPanel from './components/BonusAnalyticsPanel';

export default function App() {
  const [overview, setOverview] = useState(null);
  const [routers, setRouters] = useState([]);
  const [selectedRouterId, setSelectedRouterId] = useState(null);
  const [selectedRouterDetail, setSelectedRouterDetail] = useState(null);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingRouters, setLoadingRouters] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [filters, setFilters] = useState({
    building: 'All',
    firmware: 'All',
    status: 'All',
    search: ''
  });

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    fetchRouters();
  }, [filters]);

  useEffect(() => {
    if (selectedRouterId) {
      fetchRouterDetail(selectedRouterId);
    }
  }, [selectedRouterId]);

  const fetchOverview = async () => {
    setLoadingOverview(true);
    try {
      const res = await fetch('/api/analytics/overview');
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    } catch (err) {
      console.error('Failed to fetch overview stats:', err);
    } finally {
      setLoadingOverview(false);
    }
  };

  const fetchRouters = async () => {
    setLoadingRouters(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.building && filters.building !== 'All') queryParams.append('building', filters.building);
      if (filters.firmware && filters.firmware !== 'All') queryParams.append('firmware', filters.firmware);
      if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);
      queryParams.append('sortBy', 'health_asc');

      const res = await fetch(`/api/routers?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRouters(data.routers || []);

        if (!selectedRouterId && data.routers && data.routers.length > 0) {
          setSelectedRouterId(data.routers[0].router_id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch routers list:', err);
    } finally {
      setLoadingRouters(false);
    }
  };

  const fetchRouterDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/routers/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedRouterDetail(data);
      }
    } catch (err) {
      console.error(`Failed to fetch router details for ${id}:`, err);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-3 sm:p-6 max-w-[1680px] mx-auto font-sans">
      {/* Header Overview Banner */}
      <HeaderOverview overview={overview} loading={loadingOverview} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Rankings Table (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col min-h-[500px]">
          <WorstTenTable
            routers={routers}
            selectedRouterId={selectedRouterId}
            onSelectRouter={(id) => setSelectedRouterId(id)}
            buildings={overview?.buildings || []}
            firmwares={overview?.firmwares || []}
            filters={filters}
            onFilterChange={(newF) => setFilters(newF)}
            loading={loadingRouters}
          />
        </div>

        {/* Right Column: Detail Panel + Copilot (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <RouterDetailPanel
            routerDetail={selectedRouterDetail}
            loading={loadingDetail}
          />

          <CopilotPanel
            selectedRouterId={selectedRouterId}
            selectedRouterDetail={selectedRouterDetail}
          />
        </div>
      </div>

      {/* Bonus Analytics Row */}
      <BonusAnalyticsPanel overview={overview} routers={routers} />

      {/* Footer */}
      <footer className="mt-10 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Campus Router Health 360 · DigiPlus IT Agentic AI Hackathon Solution</p>
        <p className="font-mono text-[11px] text-slate-600">MERN Stack • Data Grounded Diagnosis</p>
      </footer>
    </div>
  );
}
