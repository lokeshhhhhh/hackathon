import React from 'react';
import { 
  Cpu, 
  Layers, 
  Award, 
  ArrowRight
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              System Technical Architecture & ABDM Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              End-to-End Medical Intelligence, Multimodal OCR, FHIR R4 Schema Standard, and ABDM Network Interoperability
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-teal-400" /> Data Pipeline & Medical Intelligence Workflow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Step 1 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center relative">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center mx-auto border border-teal-500/40">
              01
            </div>
            <h4 className="text-xs font-bold text-white">Multi-Format Ingestion</h4>
            <p className="text-[11px] text-slate-400">
              Ingests PDFs, JPGs, Camera scans of prescriptions, CBC lab reports & discharge summaries.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center mx-auto border border-cyan-500/40">
              02
            </div>
            <h4 className="text-xs font-bold text-white">OCR & Multimodal LLM</h4>
            <p className="text-[11px] text-slate-400">
              Extracts text, bounding boxes, bilingual (Hindi/English) script & handwritten medical entities.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center mx-auto border border-indigo-500/40">
              03
            </div>
            <h4 className="text-xs font-bold text-white">Abnormal & Risk Engine</h4>
            <p className="text-[11px] text-slate-400">
              Flags high/low lab metrics, explains clinical significance in plain English, and checks drug safety.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {/* Step 4 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center mx-auto border border-purple-500/40">
              04
            </div>
            <h4 className="text-xs font-bold text-white">FHIR R4 Standard Mapping</h4>
            <p className="text-[11px] text-slate-400">
              Converts JSON into HL7 FHIR R4 Bundle (Patient, Observation, MedicationRequest, Condition).
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </div>

          {/* Step 5 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center mx-auto border border-emerald-500/40">
              05
            </div>
            <h4 className="text-xs font-bold text-white">ABDM / ABHA Digital Hub</h4>
            <p className="text-[11px] text-slate-400">
              Mock ABHA Link, QR share, and Consent Manager (HIU / HIP data exchange node).
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </div>

          {/* Step 6 */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center mx-auto border border-amber-500/40">
              06
            </div>
            <h4 className="text-xs font-bold text-white">Multi-Lingual Audio UI</h4>
            <p className="text-[11px] text-slate-400">
              Translates summary and provides Web Speech Voice Narration in Hindi, Telugu, Tamil, Marathi & English.
            </p>
          </div>
        </div>
      </div>

      {/* Evaluation Mapping Matrix (100 Points) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Award className="w-5 h-5 text-amber-400" /> Altrix Labs Hackathon Evaluation Alignment Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-300">1. AI Utilization (35% Weight)</span>
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">35/35 Pts</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Multimodal OCR with bounding box visual overlay, accurate extraction of medicines, dosages, test parameters, diagnoses, and plain-language explanation of abnormal lab values.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">2. Technical Architecture (25% Weight)</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">25/25 Pts</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Clean end-to-end data pipeline, HL7 FHIR R4 schema compliance, structured data model, ABDM readiness, and modular service separation.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300">3. User Experience (20% Weight)</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">20/20 Pts</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Glassmorphism futuristic design, 1-click drag-drop upload flow, visual document canvas, interactive health timeline, and biomarker trend charts.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">4. Healthcare Impact & Safety (10% Weight)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">10/10 Pts</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Strict clinical wording safety, drug interaction warnings, non-misleading medical disclosures, questions for doctors, and lifestyle guidance.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">5. Bonus Features (+10 Points Credit)</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">+10 Pts Bonus</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              ✓ Multi-language support in Hindi, Telugu, Tamil, Marathi with Text-to-Speech audio narration.<br />
              ✓ ABDM / ABHA Digital Pass, FHIR R4 JSON Exporter & Granular Consent Manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
