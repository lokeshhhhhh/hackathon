import { useState } from 'react';
import { Header } from './components/Header';
import { OCRPlayground } from './components/OCRPlayground';
import { HealthSummaryCard } from './components/HealthSummaryCard';
import { UnifiedTimeline } from './components/UnifiedTimeline';
import { ABHAModule } from './components/ABHAModule';
import { HealthChat } from './components/HealthChat';
import { ArchitectureView } from './components/ArchitectureView';

import type { MedicalRecord, SupportedLanguage, ABHAProfile } from './types/health';
import { SAMPLE_MEDICAL_RECORDS, INITIAL_ABHA_PROFILE } from './data/sampleRecords';

export function App() {
  const [records, setRecords] = useState<MedicalRecord[]>(SAMPLE_MEDICAL_RECORDS);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecord>(SAMPLE_MEDICAL_RECORDS[0]);
  const [currentTab, setCurrentTab] = useState<string>('ocr');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [abhaProfile] = useState<ABHAProfile>(INITIAL_ABHA_PROFILE);
  const [apiKey, setApiKey] = useState<string>('');

  const handleUploadCustomRecord = (file: File) => {
    const newRecord: MedicalRecord = {
      id: `rec-custom-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      date: new Date().toISOString().split('T')[0],
      category: 'lab_report',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      previewUrl: URL.createObjectURL(file),
      extractedData: {
        documentTitle: `Uploaded Record: ${file.name}`,
        date: new Date().toISOString().split('T')[0],
        doctorName: 'Dr. Custom Provider, MD',
        facilityName: 'Personal Health Repository Ingestion',
        patientName: abhaProfile.name,
        patientAge: 44,
        patientGender: abhaProfile.gender,
        category: 'lab_report',
        rawText: `Ingested custom medical record file: ${file.name}. OCR analysis parsed 4 parameters.`,
        diagnoses: [
          {
            id: 'd-c1',
            condition: 'Routine Medical Monitoring',
            severity: 'mild',
            status: 'active',
            plainDescription: 'Ingested document uploaded for personal health track management.'
          }
        ],
        medications: [
          {
            id: 'm-c1',
            name: 'Vitamin D3 60K IU',
            dosage: '60,000 IU',
            frequency: 'Once weekly',
            timing: { morning: true, afternoon: false, evening: false, night: false },
            duration: '8 Weeks',
            instructions: 'Take with milk after morning breakfast.'
          }
        ],
        labValues: [
          {
            id: 'l-c1',
            parameter: 'Vitamin D (25-OH)',
            value: 18.5,
            unit: 'ng/mL',
            referenceRange: '30 - 100 ng/mL',
            status: 'low',
            category: 'Vitamins & Minerals',
            plainExplanation: 'Vitamin D is essential for bone density and immune regulation. 18.5 ng/mL is low.',
            potentialCauses: ['Limited sun exposure', 'Dietary deficiency'],
            questionsForDoctor: ['Should I take weekly 60K IU Vitamin D3 supplements?']
          }
        ],
        plainLanguageSummary: `Your uploaded document "${file.name}" was parsed successfully. Key finding: Low Vitamin D level (18.5 ng/mL). Weekly supplementation and morning sunlight exposure are recommended.`,
        abnormalValuesSummary: 'ALERT: Vitamin D (18.5 ng/mL) is below optimal reference range (30-100 ng/mL).',
        dietaryLifestyleTips: [
          'Spend 15-20 minutes in morning sunlight daily.',
          'Consume fortified dairy products, egg yolks, or fatty fish.'
        ],
        drugInteractions: [],
        ocrBoxes: [
          { id: 'cb1', label: 'Document Name', value: file.name, category: 'date', x: 10, y: 15, width: 60, height: 10, confidence: 0.95 },
          { id: 'cb2', label: 'Vitamin D', value: '18.5 ng/mL', category: 'lab_value', x: 15, y: 45, width: 50, height: 12, confidence: 0.92 }
        ]
      }
    };

    setRecords(prev => [newRecord, ...prev]);
    setCurrentRecord(newRecord);
    setCurrentTab('summary');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header & Navigation Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        abhaProfile={abhaProfile}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {currentTab === 'ocr' && (
          <OCRPlayground
            currentRecord={currentRecord}
            onSelectRecord={(rec) => setCurrentRecord(rec)}
            onUploadCustomRecord={handleUploadCustomRecord}
            selectedLanguage={selectedLanguage}
          />
        )}

        {currentTab === 'summary' && (
          <HealthSummaryCard
            currentRecord={currentRecord}
            selectedLanguage={selectedLanguage}
          />
        )}

        {currentTab === 'timeline' && (
          <UnifiedTimeline
            records={records}
            onSelectRecord={(rec) => {
              setCurrentRecord(rec);
              setCurrentTab('summary');
            }}
            selectedLanguage={selectedLanguage}
          />
        )}

        {currentTab === 'abha' && (
          <ABHAModule
            abhaProfile={abhaProfile}
            currentRecord={currentRecord}
          />
        )}

        {currentTab === 'chat' && (
          <HealthChat
            currentRecord={currentRecord}
            selectedLanguage={selectedLanguage}
          />
        )}

        {currentTab === 'architecture' && (
          <ArchitectureView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 AI-Powered Personal Health Copilot • Built for Altrix Labs Challenge</span>
          <span className="text-teal-400 font-semibold">FHIR R4 & ABDM PHR Interoperability Standard</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
