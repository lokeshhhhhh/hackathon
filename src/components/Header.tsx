import React, { useState } from 'react';
import { 
  Activity, 
  Globe, 
  FileText, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Cpu, 
  Sparkles,
  Key,
  Stethoscope
} from 'lucide-react';
import type { SupportedLanguage, ABHAProfile } from '../types/health';
import { SUPPORTED_LANGUAGES } from '../data/sampleRecords';
import { getTranslation } from '../services/aiHealthService';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  abhaProfile: ABHAProfile;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedLanguage,
  setSelectedLanguage,
  abhaProfile,
  apiKey,
  setApiKey
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSaveKey = () => {
    setApiKey(inputKey);
    setShowKeyModal(false);
  };

  const navItems = [
    { id: 'ocr', label: getTranslation(selectedLanguage, 'navOcr'), icon: FileText },
    { id: 'summary', label: getTranslation(selectedLanguage, 'navSummary'), icon: Sparkles },
    { id: 'timeline', label: getTranslation(selectedLanguage, 'navTimeline'), icon: Clock },
    { id: 'abha', label: getTranslation(selectedLanguage, 'navAbha'), icon: ShieldCheck },
    { id: 'chat', label: getTranslation(selectedLanguage, 'navChat'), icon: MessageSquare },
    { id: 'architecture', label: getTranslation(selectedLanguage, 'navArch'), icon: Cpu }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 backdrop-blur-xl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="h-6 w-6 text-teal-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {getTranslation(selectedLanguage, 'appTitle')}
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-full flex items-center gap-1">
                <Stethoscope className="w-3 h-3" /> Altrix Labs Hackathon
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {getTranslation(selectedLanguage, 'subtitle')}
            </p>
          </div>
        </div>

        {/* Action Controls & ABHA Status */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* ABHA Badge */}
          <button 
            onClick={() => setCurrentTab('abha')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400/60 transition-all text-xs text-indigo-300"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>ABHA: <strong className="text-white">{abhaProfile.abhaId}</strong></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>

          {/* Regional Language Switcher */}
          <div className="relative flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <Globe className="w-4 h-4 text-teal-400 ml-2" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-medium text-slate-200 py-1 pr-2 pl-1 rounded-lg focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                  {lang.flag} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Gemini API Key Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              apiKey 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-500/50'
            }`}
            title="Configure Gemini API Key (Optional - Smart Fallback active)"
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">{apiKey ? 'Gemini AI Active' : 'API Settings'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-400" /> Configure Gemini API Key
              </h3>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your Google Gemini API key to activate live multimodal AI document OCR and extraction. If left blank, the copilot will automatically run in zero-latency offline mode using built-in medical extraction models.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-teal-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 transition-all shadow-md shadow-teal-500/20"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
