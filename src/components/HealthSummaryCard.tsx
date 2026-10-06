import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  CheckCircle2, 
  Pill, 
  FlaskConical, 
  Sun, 
  Moon, 
  Sunset, 
  Coffee, 
  ShieldAlert, 
  Apple, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import type { MedicalRecord, SupportedLanguage, LabValueItem } from '../types/health';
import { getTranslation, getTranslatedSummary, speakText, stopSpeech } from '../services/aiHealthService';
import { HealthScoreCard } from './HealthScoreCard';
import { MedicalGlossaryTooltip } from './MedicalGlossaryTooltip';

interface HealthSummaryCardProps {
  currentRecord: MedicalRecord;
  selectedLanguage: SupportedLanguage;
}

export const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({
  currentRecord,
  selectedLanguage
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [expandedLabId, setExpandedLabId] = useState<string | null>(null);

  const { extractedData } = currentRecord;
  const translatedSummary = getTranslatedSummary(extractedData.plainLanguageSummary, selectedLanguage);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(translatedSummary, selectedLanguage, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const getLabStatusBadge = (status: string) => {
    switch (status) {
      case 'high':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">HIGH 🔴</span>;
      case 'low':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">LOW 🟡</span>;
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">CRITICAL 🚨</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">NORMAL 🟢</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Health Score & Risk Profile Card */}
      <HealthScoreCard currentRecord={currentRecord} />

      {/* Medical Safety Disclaimer Banner */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 font-bold">{getTranslation(selectedLanguage, 'disclaimerTitle')}</strong> {getTranslation(selectedLanguage, 'disclaimerText')}
        </div>
      </div>

      {/* Main AI Plain-Language Health Summary */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              {getTranslation(selectedLanguage, 'summaryTitle')}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Synthesized from {extractedData.documentTitle} ({extractedData.date})
            </p>
          </div>

          {/* Text to Speech Voice Synthesizer Button */}
          <button
            onClick={toggleAudio}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 shadow-teal-500/20'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                {getTranslation(selectedLanguage, 'stopAudio')}
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                {getTranslation(selectedLanguage, 'listenSummary')}
              </>
            )}
          </button>
        </div>

        {/* Plain Language Summary Paragraph with Medical Glossary Tooltips */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800/80 space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {translatedSummary}
          </p>
          {extractedData.abnormalValuesSummary && (
            <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{extractedData.abnormalValuesSummary}</span>
            </div>
          )}
        </div>

        {/* Diagnoses Pills */}
        {extractedData.diagnoses.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Identified Conditions & Diagnoses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extractedData.diagnoses.map((diag) => (
                <div key={diag.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">
                      <MedicalGlossaryTooltip term={diag.condition} />
                    </span>
                    {diag.icdCode && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        ICD: {diag.icdCode}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{diag.plainDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Abnormal Lab Values & Clinical Risk Section */}
      {extractedData.labValues.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-amber-400" />
              {getTranslation(selectedLanguage, 'abnormalTitle')}
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {extractedData.labValues.length} Lab Test Parameters Inspected
            </span>
          </div>

          <div className="space-y-3">
            {extractedData.labValues.map((lab: LabValueItem) => {
              const isExpanded = expandedLabId === lab.id;

              return (
                <div 
                  key={lab.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    lab.status === 'high' ? 'bg-slate-900/90 border-rose-500/30 hover:border-rose-500/50' :
                    lab.status === 'low' ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-500/50' :
                    'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Header Row */}
                  <div 
                    onClick={() => setExpandedLabId(isExpanded ? null : lab.id)}
                    className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-slate-200">
                        🧪
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">
                          <MedicalGlossaryTooltip term={lab.parameter} />
                        </h4>
                        <span className="text-xs text-slate-400">Ref Range: {lab.referenceRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-base font-bold text-white">{lab.value}</span>
                        <span className="text-xs text-slate-400 ml-1">{lab.unit}</span>
                      </div>
                      {getLabStatusBadge(lab.status)}
                      <button className="text-slate-400 hover:text-slate-200">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Plain Language & Action Plan */}
                  {isExpanded && (
                    <div className="bg-slate-950 p-4 border-t border-slate-800/80 space-y-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/60">
                        <span className="font-bold text-teal-300 block mb-1">What This Value Means for You:</span>
                        <p className="text-slate-300 leading-relaxed">{lab.plainExplanation}</p>
                      </div>

                      {lab.potentialCauses && lab.potentialCauses.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-300 block mb-1">Potential Common Factors:</span>
                          <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                            {lab.potentialCauses.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {lab.questionsForDoctor && lab.questionsForDoctor.length > 0 && (
                        <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/20">
                          <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                            <HelpCircle className="w-3.5 h-3.5" /> Questions to Ask Your Doctor:
                          </span>
                          <ul className="list-disc list-inside text-indigo-200/80 space-y-0.5">
                            {lab.questionsForDoctor.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prescribed Medications & Dosage Schedule */}
      {extractedData.medications.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-400" />
              {getTranslation(selectedLanguage, 'medsTitle')}
            </h2>
            <span className="text-xs text-slate-400">
              Active Prescriptions ({extractedData.medications.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extractedData.medications.map((med) => (
              <div 
                key={med.id}
                className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      <MedicalGlossaryTooltip term={med.name} />
                    </h3>
                    <p className="text-xs text-slate-400">{med.genericName}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    {med.dosage}
                  </span>
                </div>

                {/* Regional Language Script Tag */}
                {med.regionalName && (
                  <div className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                    🇮🇳 {med.regionalName}
                  </div>
                )}

                {/* Daily Schedule Timing Badges */}
                <div className="flex items-center gap-2 text-xs pt-1">
                  <span className="text-slate-400 font-semibold">Timing:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {med.timing.morning && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1 text-[11px]">
                        <Sun className="w-3 h-3" /> Morning
                      </span>
                    )}
                    {med.timing.afternoon && (
                      <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20 flex items-center gap-1 text-[11px]">
                        <Coffee className="w-3 h-3" /> Afternoon
                      </span>
                    )}
                    {med.timing.evening && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1 text-[11px]">
                        <Sunset className="w-3 h-3" /> Evening
                      </span>
                    )}
                    {med.timing.night && (
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1 text-[11px]">
                        <Moon className="w-3 h-3" /> Night
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <strong className="text-slate-400">Instruction:</strong> {med.instructions}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drug Interactions & Safety Alerts */}
      {extractedData.drugInteractions.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 bg-rose-950/20">
          <h2 className="text-lg font-bold text-rose-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            {getTranslation(selectedLanguage, 'drugInteractions')}
          </h2>
          <div className="space-y-3">
            {extractedData.drugInteractions.map((int) => (
              <div key={int.id} className="bg-slate-900/90 p-4 rounded-xl border border-rose-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300 uppercase">
                    {int.severity} Interaction Flagged
                  </span>
                  <span className="text-slate-400">Drugs: {int.drugs.join(' + ')}</span>
                </div>
                <p className="text-slate-300">{int.description}</p>
                <div className="bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20 text-rose-200">
                  <strong>Recommendation:</strong> {int.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary & Lifestyle Tips */}
      {extractedData.dietaryLifestyleTips.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Apple className="w-5 h-5 text-emerald-400" />
            {getTranslation(selectedLanguage, 'dietaryTips')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {extractedData.dietaryLifestyleTips.map((tip, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
