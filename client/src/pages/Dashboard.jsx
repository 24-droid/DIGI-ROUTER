import React, { useState, useEffect } from 'react';
import HeaderOverview from '../components/HeaderOverview';
import WorstTenTable from '../components/WorstTenTable';
import RouterDetailPanel from '../components/RouterDetailPanel';
import CopilotPanel from '../components/CopilotPanel';
import BonusAnalyticsPanel from '../components/BonusAnalyticsPanel';

export default function Dashboard() {
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
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />

      <div className="relative z-10 text-slate-100 p-3 sm:p-5 lg:p-6 max-w-[1720px] mx-auto font-sans">
        <HeaderOverview overview={overview} loading={loadingOverview} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mb-4 lg:mb-5">
          <div className="lg:col-span-5 flex flex-col">
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

          <div className="lg:col-span-7 flex flex-col">
            <RouterDetailPanel
              routerDetail={selectedRouterDetail}
              loading={loadingDetail}
            />
          </div>
        </div>

        <div className="mb-4 lg:mb-5">
          <CopilotPanel
            selectedRouterId={selectedRouterId}
            selectedRouterDetail={selectedRouterDetail}
          />
        </div>

        <BonusAnalyticsPanel overview={overview} routers={routers} />

        <footer className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-xs text-slate-500">Campus Router Health 360 · AI-Powered Network Diagnostics Platform</p>
          </div>
          <p className="font-mono text-[10px] text-slate-600 tracking-wider uppercase">Enterprise Telemetry · Data Grounded AI Diagnosis</p>
        </footer>
      </div>
    </div>
  );
}
