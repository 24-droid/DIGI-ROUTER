import React, { useRef, useState } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

export default function CsvUploadSection() {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (file) => {
    if (!file || !file.name.toLowerCase().endsWith('.csv')) return;
    setFileName(file.name);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="card-linear p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Upload className="w-3.5 h-3.5 text-cyan-400" />
        <span className="section-label text-slate-400">Upload CSV</span>
        <span className="text-[10px] text-slate-600 ml-auto">CSV only</span>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-dashed px-4 py-3 cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-cyan-500/50 bg-cyan-500/5'
            : 'border-white/[0.1] bg-dark-950/40 hover:border-cyan-500/30 hover:bg-dark-950/60'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-300 font-medium">
              {fileName || 'Drag & drop your CSV file here'}
            </p>
            <p className="text-[10px] text-slate-600 mt-0.5">routers.csv, metrics.csv, or complaints.csv</p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          className="px-3.5 py-1.5 rounded-lg btn-glow text-white text-xs font-bold shrink-0 self-start sm:self-auto"
        >
          Choose CSV
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
