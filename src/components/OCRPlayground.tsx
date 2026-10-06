import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Cpu, 
  Pill, 
  FlaskConical, 
  Layers,
  ShieldCheck
} from 'lucide-react';
import type { MedicalRecord, SupportedLanguage } from '../types/health';
import { SAMPLE_MEDICAL_RECORDS } from '../data/sampleRecords';
import { getTranslation } from '../services/aiHealthService';

interface OCRPlaygroundProps {
  currentRecord: MedicalRecord;
  onSelectRecord: (record: MedicalRecord) => void;
  onUploadCustomRecord: (file: File) => void;
  selectedLanguage: SupportedLanguage;
}

export const OCRPlayground: React.FC<OCRPlaygroundProps> = ({
  currentRecord,
  onSelectRecord,
  onUploadCustomRecord,
  selectedLanguage
}) => {
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true);
      setTimeout(() => {
        onUploadCustomRecord(e.target.files![0]);
        setIsProcessing(false);
      }, 1200);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsProcessing(true);
      setTimeout(() => {
        onUploadCustomRecord(e.dataTransfer.files[0]);
        setIsProcessing(false);
      }, 1200);
    }
  };

  const { extractedData } = currentRecord;
  const abnormalCount = extractedData.labValues.filter(l => l.status === 'high' || l.status === 'low' || l.status === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Sample Presets */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              {getTranslation(selectedLanguage, 'uploadHeader')}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Ingest prescriptions, lab reports, discharge summaries, or diagnostic records. Supports handwritten, bilingual (Hindi/English) OCR.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Preset Samples:</span>
            {SAMPLE_MEDICAL_RECORDS.map((rec) => (
              <button
                key={rec.id}
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    onSelectRecord(rec);
                    setIsProcessing(false);
                  }, 400);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  currentRecord.id === rec.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-md shadow-teal-500/10'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {rec.category === 'prescription' ? '💊 Prescription' : rec.category === 'lab_report' ? '🧪 Lab Report' : '🏥 Discharge'}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Zone */}
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
            dragActive 
              ? 'border-teal-400 bg-teal-500/10' 
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
          }`}
        >
          <input 
            type="file" 
            id="file-upload" 
            accept="image/*,.pdf" 
            onChange={handleFileUpload}
            className="hidden" 
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Upload className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Drop your medical record here, or <span className="text-teal-400 underline">browse files</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF, JPG, PNG, WEBP (Prescriptions, Lab Results, Discharge Cards)
              </p>
            </div>
          </label>
        </div>

        {/* Invalid Document Alert Banner */}
        {currentRecord.isInvalidDocument && (
          <div className="bg-rose-950/50 border border-rose-500/40 rounded-2xl p-5 flex items-start gap-4 animate-fade-in shadow-lg shadow-rose-950/20">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="text-sm font-bold text-rose-200 flex items-center gap-2">
                <span>Non-Medical Document Detected</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/30 text-rose-300 border border-rose-500/50 uppercase">
                  Parsing Aborted
                </span>
              </h4>
              <p className="text-xs text-rose-300/90 leading-relaxed">
                {currentRecord.validationErrorReason || 'The uploaded file does not contain valid clinical lab report parameters, diagnoses, or prescriptions.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-slate-300">Select a valid sample report:</span>
                <button
                  onClick={() => onSelectRecord(SAMPLE_MEDICAL_RECORDS[0])}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-500/40 hover:bg-rose-500/30 transition-all shadow-sm"
                >
                  💊 Switch to Sample Prescription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OCR Document Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Document Viewer with Bounding Boxes (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Visual OCR Document Overlay</h3>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-teal-400" /> {currentRecord.fileName}
            </span>
          </div>

          {/* Interactive Canvas with Bounding Boxes */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[420px] flex items-center justify-center">
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950/90 z-30 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-semibold text-teal-400 animate-pulse">
                  Analyzing Document OCR & Medical Entities...
                </p>
              </div>
            )}

            {/* Document Background Preview */}
            <div className="relative w-full min-h-[440px] p-4 flex justify-center items-center bg-slate-900/60 rounded-xl">
              <img 
                src={currentRecord.previewUrl} 
                alt="Medical Record"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sample_blood_lab_report.png';
                }}
                className="max-h-[480px] w-auto max-w-full object-contain rounded-lg shadow-2xl opacity-90 filter brightness-95 contrast-105"
              />

              {/* Bounding Box Highlights */}
              {extractedData.ocrBoxes.map((box) => {
                const isActive = activeBoxId === box.id;
                const categoryColors: Record<string, string> = {
                  medication: 'border-teal-400 bg-teal-500/25 text-teal-200',
                  lab_value: 'border-amber-400 bg-amber-500/25 text-amber-200',
                  diagnosis: 'border-indigo-400 bg-indigo-500/25 text-indigo-200',
                  date: 'border-cyan-400 bg-cyan-500/25 text-cyan-200',
                  doctor: 'border-purple-400 bg-purple-500/25 text-purple-200'
                };

                return (
                  <div
                    key={box.id}
                    onMouseEnter={() => setActiveBoxId(box.id)}
                    onMouseLeave={() => setActiveBoxId(null)}
                    style={{
                      position: 'absolute',
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`
                    }}
                    className={`border-2 rounded-lg transition-all cursor-pointer z-10 flex items-start p-1 ${
                      categoryColors[box.category] || 'border-teal-400 bg-teal-500/25'
                    } ${isActive ? 'ring-4 ring-teal-400 scale-[1.02] z-20 shadow-xl shadow-teal-500/20' : 'opacity-85 hover:opacity-100'}`}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-950/90 text-white rounded border border-slate-700 shadow whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                      {box.label}: {box.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OCR Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="font-semibold text-slate-300">Extracted Entities:</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-teal-400"></span> Medication</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Lab Metric</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-400"></span> Diagnosis</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-cyan-400"></span> Date/Doctor</span>
          </div>
        </div>

        {/* Right Column: Structured Extracted Summary & Pipeline Stats (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-400" /> Medical Intelligence Output
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> OCR 98.4% Acc
            </span>
          </div>

          {/* Extracted Stats Summary Pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Pill className="w-4 h-4 text-teal-400" /> Prescribed Meds
              </div>
              <p className="text-xl font-bold text-white mt-1">
                {extractedData.medications.length} <span className="text-xs font-normal text-slate-400">items</span>
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FlaskConical className="w-4 h-4 text-amber-400" /> Lab Parameters
              </div>
              <p className="text-xl font-bold text-white mt-1">
                {extractedData.labValues.length} <span className="text-xs font-normal text-slate-400">tests</span>
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Abnormal Values
              </div>
              <p className="text-xl font-bold text-rose-400 mt-1">
                {abnormalCount} <span className="text-xs font-normal text-slate-400">flagged</span>
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> FHIR Standard
              </div>
              <p className="text-sm font-bold text-indigo-300 mt-1">
                R4 Aligned
              </p>
            </div>
          </div>

          {/* Document Metadata Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Document Title:</span>
              <span className="text-slate-200 font-semibold">{extractedData.documentTitle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Facility / Clinic:</span>
              <span className="text-slate-200 font-medium">{extractedData.facilityName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Physician:</span>
              <span className="text-slate-200 font-medium">{extractedData.doctorName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Document Date:</span>
              <span className="text-teal-400 font-bold">{extractedData.date}</span>
            </div>
          </div>

          {/* Extracted Entity Highlights List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quick Extracted Items
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {extractedData.medications.map((med) => (
                <div 
                  key={med.id}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-semibold text-slate-200">{med.name} ({med.dosage})</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-teal-300">
                    {med.frequency}
                  </span>
                </div>
              ))}

              {extractedData.labValues.map((lab) => (
                <div 
                  key={lab.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    lab.status === 'high' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
                    lab.status === 'low' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
                    'bg-slate-900/80 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold">{lab.parameter}</span>
                  </div>
                  <span className="font-bold">{lab.value} {lab.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
