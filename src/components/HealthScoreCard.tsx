import React, { useState } from 'react';
import { 
  HeartPulse, 
  Printer, 
  Stethoscope,
  AlertTriangle
} from 'lucide-react';
import type { MedicalRecord } from '../types/health';

interface HealthScoreCardProps {
  currentRecord: MedicalRecord;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ currentRecord }) => {
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  if (currentRecord.isInvalidDocument) {
    return (
      <div className="bg-rose-950/40 border border-rose-500/40 p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-300">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 animate-pulse" />
          <div>
            <h3 className="text-base font-bold text-white">Non-Medical Document Alert</h3>
            <p className="text-xs text-rose-200/90 mt-0.5">
              {currentRecord.validationErrorReason || `The uploaded document "${currentRecord.fileName}" is not a recognized medical report or prescription.`}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          ℹ️ Health Index and Clinical Risk scoring are deactivated for non-medical files. Please upload a valid medical report or select a sample prescription from the OCR tab.
        </p>
      </div>
    );
  }

  const { extractedData } = currentRecord;
  const abnormalCount = extractedData.labValues.filter(l => l.status === 'high' || l.status === 'low' || l.status === 'critical').length;
  
  // Calculate dynamic wellness score
  const overallScore = Math.max(50, 100 - (abnormalCount * 8) - (extractedData.diagnoses.length * 4));

  return (
    <>
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Personal Health Index & Clinical Risk Profile
              </h3>
              <p className="text-xs text-slate-400">Aggregated biomarker analysis & sub-system health risk scoring</p>
            </div>
          </div>

          <button
            onClick={() => setShowDoctorModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 flex items-center gap-2 transition-all shadow-md shadow-teal-500/20"
          >
            <Printer className="w-4 h-4" /> Print Doctor Visit Prep Card
          </button>
        </div>

        {/* Health Score Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Score Dial (4 cols) */}
          <div className="md:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative overflow-hidden">
            <div className="w-28 h-28 rounded-full border-4 border-teal-500/30 border-t-teal-400 flex flex-col items-center justify-center mx-auto shadow-xl">
              <span className="text-3xl font-extrabold text-white">{overallScore}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">out of 100</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-teal-300">Overall Health Vitality Index</h4>
              <p className="text-xs text-slate-400 mt-1">
                {overallScore >= 75 ? 'Stable Control • Action items flagged' : 'Requires Clinical Attention'}
              </p>
            </div>
          </div>

          {/* Sub-system Risk Gauges (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Glycemic Control (Sugar)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Moderate Risk 🟡
                </span>
              </div>
              <p className="text-[11px] text-slate-400">HbA1c 8.2% • Fasting Glucose 184 mg/dL</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Cardiovascular Health</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Managed Stent 🟢
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Post PCI LAD Stent • Aspirin + Clopidogrel Active</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Renal (Kidney) Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Early Monitor 🟡
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Serum Creatinine 1.4 mg/dL • eGFR 58 mL/min</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Lipid & Heart Arteries</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Elevated LDL 🔴
                </span>
              </div>
              <p className="text-[11px] text-slate-400">LDL 148 mg/dL • Statin therapy active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Preparation Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Doctor Visit Preparation Checklist</h3>
              </div>
              <button 
                onClick={() => setShowDoctorModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-teal-300 block">1. Active Prescriptions Summary:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {extractedData.medications.map(m => (
                    <li key={m.id}>
                      <strong>{m.name} ({m.dosage}):</strong> {m.frequency} - {m.instructions}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block">2. Flagged Abnormal Parameters to Discuss:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {extractedData.labValues.map(l => (
                    <li key={l.id}>
                      <strong>{l.parameter}:</strong> Result {l.value} {l.unit} (Ref: {l.referenceRange})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 block">3. Top Questions for Your Physician:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Is my current diabetes dosage sufficient to bring HbA1c below 7.0%?</li>
                  <li>Are my creatinine levels (1.4 mg/dL) safe with my current Metformin prescription?</li>
                  <li>How long should I remain on dual blood thinners (Aspirin + Clopidogrel)?</li>
                </ol>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 shadow-md"
              >
                🖨️ Print Checklist
              </button>
              <button
                onClick={() => setShowDoctorModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
