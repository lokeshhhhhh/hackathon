import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  Filter, 
  Pill, 
  FlaskConical, 
  Hospital,
  ChevronRight,
  Download
} from 'lucide-react';
import type { MedicalRecord, SupportedLanguage } from '../types/health';
import { getTranslation, convertToFHIRBundle } from '../services/aiHealthService';

interface UnifiedTimelineProps {
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
  selectedLanguage: SupportedLanguage;
}

export const UnifiedTimeline: React.FC<UnifiedTimelineProps> = ({
  records,
  onSelectRecord,
  selectedLanguage
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'timeline' | 'trends' | 'meds'>('timeline');

  // Simulated Historical Biomarker Trend Data
  const hba1cHistory = [
    { date: '2025-10', value: 9.1, status: 'high' },
    { date: '2026-02', value: 8.6, status: 'high' },
    { date: '2026-06', value: 8.4, status: 'high' },
    { date: '2026-09', value: 8.2, status: 'high' }
  ];

  const glucoseHistory = [
    { date: '2025-10', value: 210, status: 'high' },
    { date: '2026-02', value: 195, status: 'high' },
    { date: '2026-06', value: 189, status: 'high' },
    { date: '2026-09', value: 184, status: 'high' }
  ];

  const filteredRecords = filterCategory === 'all' 
    ? records 
    : records.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Tab Switcher Header */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg font-bold text-white">
            {getTranslation(selectedLanguage, 'timelineTitle')}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'timeline' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📜 Care Timeline
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'trends' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📈 Biomarker Trends
          </button>
          <button
            onClick={() => setActiveTab('meds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'meds' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💊 Daily Medication Log
          </button>
        </div>
      </div>

      {/* View 1: Unified Care Journey Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
              <Filter className="w-3.5 h-3.5 text-teal-400" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Records' },
              { id: 'prescription', label: 'Prescriptions' },
              { id: 'lab_report', label: 'Lab Diagnostics' },
              { id: 'discharge_summary', label: 'Discharge Cards' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterCategory === f.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Vertical Timeline Tree */}
          <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
            {filteredRecords.map((record) => {
              const { extractedData } = record;
              const fhirBundle = convertToFHIRBundle(record);

              const handleDownloadFHIR = (e: React.MouseEvent) => {
                e.stopPropagation();
                const jsonStr = JSON.stringify(fhirBundle, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `FHIR_R4_${record.id}.json`;
                a.click();
              };

              return (
                <div key={record.id} className="relative group">
                  {/* Timeline Point Icon */}
                  <div className="absolute -left-[35px] top-1.5 w-7 h-7 rounded-full bg-slate-950 border-2 border-teal-500 flex items-center justify-center text-teal-400 shadow-lg group-hover:scale-110 transition-transform">
                    {record.category === 'prescription' ? <Pill className="w-3.5 h-3.5" /> :
                     record.category === 'lab_report' ? <FlaskConical className="w-3.5 h-3.5" /> :
                     <Hospital className="w-3.5 h-3.5" />}
                  </div>

                  {/* Card Body */}
                  <div 
                    onClick={() => onSelectRecord(record)}
                    className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 cursor-pointer hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                          {record.category.replace('_', ' ')}
                        </span>
                        <h3 className="text-base font-bold text-slate-100">{record.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-400" /> {record.date}
                        </span>
                        <button
                          onClick={handleDownloadFHIR}
                          className="px-2.5 py-1 text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 rounded-lg flex items-center gap-1 transition-all"
                          title="Download FHIR R4 Bundle JSON"
                        >
                          <Download className="w-3 h-3" /> FHIR JSON
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Attending Doctor / Facility:</span>
                        <p className="text-slate-200 font-medium">{extractedData.doctorName} • {extractedData.facilityName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Identified Diagnoses:</span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {extractedData.diagnoses.map(d => (
                            <span key={d.id} className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 text-[11px]">
                              {d.condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 line-clamp-2">
                      {extractedData.plainLanguageSummary}
                    </p>

                    <div className="flex justify-end pt-1">
                      <span className="text-xs font-semibold text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Inspect Full Extraction <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Biomarker Trends Graph */}
      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: HbA1c Long-term Trend */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-400" /> HbA1c (Glycated Hemoglobin)
                </h3>
                <span className="text-xs text-slate-400">Target Normal Threshold: &lt; 5.7%</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Latest: 8.2%
              </span>
            </div>

            {/* Visual Graph */}
            <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-4 bg-slate-950 rounded-xl border border-slate-800 relative">
              {/* Target Line */}
              <div className="absolute top-[60%] left-0 right-0 border-b border-dashed border-emerald-500/50 flex justify-end pr-2">
                <span className="text-[10px] text-emerald-400 bg-slate-950 px-1">Target 5.7%</span>
              </div>

              {hba1cHistory.map((item, idx) => {
                const heightPct = (item.value / 10) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 z-10">
                    <span className="text-xs font-bold text-rose-300">{item.value}%</span>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-8 rounded-t-lg bg-gradient-to-t from-rose-600 to-rose-400 shadow-lg shadow-rose-500/20"
                    ></div>
                    <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
              💡 <strong>Trend Analysis:</strong> Your HbA1c has shown gradual improvement from 9.1% down to 8.2% over 12 months. Continued dose compliance and dietary sugar restrictions are bringing levels closer toward clinical targets.
            </p>
          </div>

          {/* Chart 2: Fasting Blood Sugar Trend */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" /> Fasting Glucose (mg/dL)
                </h3>
                <span className="text-xs text-slate-400">Normal Range: 70 - 99 mg/dL</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Latest: 184 mg/dL
              </span>
            </div>

            {/* Visual Graph */}
            <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-4 bg-slate-950 rounded-xl border border-slate-800 relative">
              <div className="absolute top-[55%] left-0 right-0 border-b border-dashed border-emerald-500/50 flex justify-end pr-2">
                <span className="text-[10px] text-emerald-400 bg-slate-950 px-1">Normal &lt; 99</span>
              </div>

              {glucoseHistory.map((item, idx) => {
                const heightPct = (item.value / 250) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 z-10">
                    <span className="text-xs font-bold text-amber-300">{item.value}</span>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-8 rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-400 shadow-lg shadow-amber-500/20"
                    ></div>
                    <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
              💡 <strong>Trend Analysis:</strong> Fasting glucose has dropped from 210 to 184 mg/dL. Morning timing of Metformin SR helps stabilize dawn phenomenon glucose spikes.
            </p>
          </div>
        </div>
      )}

      {/* View 3: Daily Medication Reminders */}
      {activeTab === 'meds' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-400" /> Today&apos;s Medication Compliance Log
              </h3>
              <p className="text-xs text-slate-400">Track and log your active daily prescription doses</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Streak: 14 Days Active 🔥
            </span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'm1', name: 'Metformin SR 500mg', time: 'Morning (After Breakfast)', taken: true },
              { id: 'm2', name: 'Telmisartan 40mg', time: 'Morning (Empty Stomach)', taken: true },
              { id: 'm3', name: 'Aspirin 75mg', time: 'Afternoon (After Lunch)', taken: true },
              { id: 'm4', name: 'Clopidogrel 75mg', time: 'Night (After Dinner)', taken: false },
              { id: 'm5', name: 'Atorvastatin 40mg', time: 'Night (Bedtime)', taken: false }
            ].map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  item.taken 
                    ? 'bg-slate-900/60 border-slate-800 opacity-75' 
                    : 'bg-slate-900 border-teal-500/30 hover:border-teal-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    item.taken ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                  }`}>
                    {item.taken && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${item.taken ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {item.name}
                    </h4>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                </div>

                <button className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  item.taken ? 'bg-slate-800 text-slate-400' : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                }`}>
                  {item.taken ? 'Logged ✓' : 'Mark Taken'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
