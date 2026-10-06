import React, { useState } from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Download, 
  FileCode, 
  Lock, 
  CheckCircle2, 
  Building2
} from 'lucide-react';
import type { ABHAProfile, MedicalRecord } from '../types/health';
import { convertToFHIRBundle } from '../services/aiHealthService';

interface ABHAModuleProps {
  abhaProfile: ABHAProfile;
  currentRecord: MedicalRecord;
}

export const ABHAModule: React.FC<ABHAModuleProps> = ({
  abhaProfile,
  currentRecord
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'fhir' | 'consent'>('profile');
  const [copied, setCopied] = useState(false);

  const fhirBundle = convertToFHIRBundle(currentRecord, abhaProfile.abhaId);
  const fhirJsonString = JSON.stringify(fhirBundle, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(fhirJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([fhirJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ABDM_FHIR_Bundle_${abhaProfile.abhaNumber}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* ABDM Readiness Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                ABDM / ABHA Digital Health Network
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                FHIR R4 Aligned
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ayushman Bharat Digital Mission (ABDM) PHR Sandbox Integration & Interoperability Hub
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'profile'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💳 Digital ABHA Card
          </button>
          <button
            onClick={() => setActiveSubTab('fhir')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'fhir'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚙️ FHIR R4 Schema Inspector
          </button>
          <button
            onClick={() => setActiveSubTab('consent')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'consent'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔐 Consent Manager
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Digital ABHA Card & Details */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ABHA Digital Pass Card (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    ABHA Digital Health Pass
                  </h3>
                  <p className="text-[10px] text-indigo-300 font-mono">National Health Authority (NHA)</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase text-indigo-300 tracking-wider font-semibold">ABHA Address (PHR):</span>
                <p className="text-lg font-mono font-bold text-white">{abhaProfile.abhaId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">ABHA Number:</span>
                  <span className="font-mono font-bold text-slate-200">{abhaProfile.abhaNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Full Name:</span>
                  <span className="font-bold text-slate-200">{abhaProfile.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Gender / DOB:</span>
                  <span className="text-slate-200">{abhaProfile.gender} | {abhaProfile.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mobile Linked:</span>
                  <span className="text-slate-200">{abhaProfile.mobile}</span>
                </div>
              </div>
            </div>

            {/* QR Code Graphic Simulation */}
            <div className="bg-white p-3 rounded-xl max-w-[140px] mx-auto shadow-xl flex flex-col items-center gap-1">
              <div className="w-28 h-28 bg-slate-900 rounded flex items-center justify-center p-2 text-white">
                <QrCode className="w-24 h-24 text-teal-400" />
              </div>
              <span className="text-[9px] font-mono text-slate-700 font-bold">ABDM Scan & Share</span>
            </div>
          </div>

          {/* Linked Repository & Metadata (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-4 h-4 text-indigo-400" /> Linked Health Repositories & Provider Nodes
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                    🏥
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100">Max Healthcare Saket Node</h4>
                    <span className="text-slate-400">HIP ID: IN-MAX-DELHI-001 • Linked on 10 Aug 2026</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[11px]">
                  Active Fetch
                </span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                    🫀
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100">Fortis Escorts Heart Institute Node</h4>
                    <span className="text-slate-400">HIP ID: IN-FORTIS-DELHI-004 • Linked on 15 Aug 2026</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[11px]">
                  Active Fetch
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-indigo-300">ABDM Interoperability Principles:</h4>
              <p className="text-slate-400 leading-relaxed">
                Health records ingested into the Personal Health Copilot are structured into HL7 FHIR R4 Bundle specifications. Records can be fetched, signed, and encrypted via standard ABDM Gateway APIs with patient consent.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Interactive FHIR R4 JSON Viewer */}
      {activeSubTab === 'fhir' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" /> HL7 FHIR R4 Standard Document Bundle
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically converted schema for: {currentRecord.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJSON}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied ✓' : 'Copy JSON'}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-teal-500 text-slate-950 hover:opacity-90 flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Download Bundle (.json)
              </button>
            </div>
          </div>

          {/* Code Inspector Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[480px] overflow-y-auto font-mono text-xs text-teal-300 space-y-1">
            <pre className="whitespace-pre-wrap leading-relaxed">
              {fhirJsonString}
            </pre>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: ABDM Consent Manager */}
      {activeSubTab === 'consent' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" /> Digital Health Consent Manager (HIU / HIP)
              </h3>
              <p className="text-xs text-slate-400">Control granular data access permissions for healthcare providers</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              3 Active Consents
            </span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'c1', requester: 'City Healthcare & Diabetes Center', purpose: 'Outpatient Care & Prescription Review', expiry: '2027-08-10', status: 'ACTIVE', types: ['DiagnosticReport', 'MedicationRequest'] },
              { id: 'c2', requester: 'Max Speciality Lab Saket', purpose: 'Diagnostic Report Aggregation', expiry: '2026-12-31', status: 'ACTIVE', types: ['Observation'] },
              { id: 'c3', requester: 'Apollo Telehealth Consultation', purpose: 'Remote Second Opinion Review', expiry: '2026-10-15', status: 'ACTIVE', types: ['Bundle'] }
            ].map(c => (
              <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-100">{c.requester}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-slate-400">Purpose: {c.purpose} • Valid till: {c.expiry}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-slate-400">Shared FHIR Objects:</span>
                    {c.types.map(t => (
                      <span key={t} className="px-2 py-0.2 rounded bg-slate-800 text-indigo-300 text-[10px] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 transition-all">
                  Revoke Consent
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
