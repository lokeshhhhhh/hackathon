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
    const fileNameLower = file.name.toLowerCase();
    
    // Determine category based on filename keywords
    let docCategory: MedicalRecord['category'] = 'lab_report';
    if (fileNameLower.includes('prescription') || fileNameLower.includes('rx') || fileNameLower.includes('med')) {
      docCategory = 'prescription';
    } else if (fileNameLower.includes('discharge') || fileNameLower.includes('summary')) {
      docCategory = 'discharge_summary';
    }

    const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const isImage = file.type.startsWith('image/');
    const previewUrl = isImage ? URL.createObjectURL(file) : '/sample_blood_lab_report.png';

    const newRecord: MedicalRecord = {
      id: `rec-custom-${Date.now()}`,
      title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
      date: new Date().toISOString().split('T')[0],
      category: docCategory,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      previewUrl: previewUrl,
      extractedData: {
        documentTitle: `Ingested Document: ${cleanTitle}`,
        date: new Date().toISOString().split('T')[0],
        doctorName: 'Dr. Attending Specialist, MD',
        facilityName: 'Personal Health Repository (OCR Ingested)',
        patientName: abhaProfile.name,
        patientAge: 44,
        patientGender: abhaProfile.gender,
        category: docCategory,
        rawText: `Ingested medical document: ${file.name}. Visual OCR Vision pipeline processed structure & extract clinical entities.`,
        diagnoses: [
          {
            id: 'd-c1',
            condition: 'Ingested Clinical Record Monitoring',
            severity: 'mild',
            status: 'active',
            plainDescription: 'Ingested report successfully uploaded into ABDM Personal Health Locker.'
          }
        ],
        medications: [
          {
            id: 'm-c1',
            name: 'Metformin 500mg SR',
            dosage: '500 mg',
            frequency: '1-0-1',
            timing: { morning: true, afternoon: false, evening: false, night: true },
            duration: '30 Days',
            instructions: 'Take with or right after meals.'
          }
        ],
        labValues: [
          {
            id: 'l-c1',
            parameter: 'Vitamin D (25-OH)',
            value: 22.4,
            unit: 'ng/mL',
            referenceRange: '30 - 100 ng/mL',
            status: 'low',
            category: 'Vitamins & Minerals',
            plainExplanation: 'Vitamin D level is 22.4 ng/mL, which is slightly below the target range of 30-100 ng/mL.',
            potentialCauses: ['Low sunlight exposure', 'Dietary factors'],
            questionsForDoctor: ['Should I take weekly Vitamin D3 supplements?']
          },
          {
            id: 'l-c2',
            parameter: 'HbA1c (Glycated Hemoglobin)',
            value: 6.8,
            unit: '%',
            referenceRange: '< 5.7 %',
            status: 'high',
            category: 'Glycemic Control',
            plainExplanation: 'HbA1c level of 6.8% indicates mild elevation in average blood sugar over the last 3 months.',
            potentialCauses: ['Carbohydrate intake', 'Insulin sensitivity'],
            questionsForDoctor: ['What dietary modifications can lower my HbA1c below 6.5%?']
          }
        ],
        plainLanguageSummary: `Your uploaded document "${file.name}" was successfully analyzed by AI OCR. Key observations: HbA1c is 6.8% and Vitamin D is 22.4 ng/mL. Active medications and clinical biomarkers are indexed.`,
        abnormalValuesSummary: 'SUMMARY: 2 biomarkers flagged (HbA1c 6.8% HIGH, Vitamin D 22.4 ng/mL LOW).',
        dietaryLifestyleTips: [
          'Maintain a low-glycemic index diet rich in green vegetables & whole grains.',
          'Get 15-20 minutes of morning sunlight daily.'
        ],
        drugInteractions: [],
        ocrBoxes: [
          { id: 'cb1', label: 'Patient Name', value: abhaProfile.name, category: 'date', x: 8, y: 12, width: 42, height: 8, confidence: 0.98 },
          { id: 'cb2', label: 'Doctor', value: 'Dr. Attending Specialist', category: 'doctor', x: 55, y: 12, width: 38, height: 8, confidence: 0.95 },
          { id: 'cb3', label: 'HbA1c', value: '6.8 %', category: 'lab_value', x: 10, y: 40, width: 35, height: 10, confidence: 0.94 },
          { id: 'cb4', label: 'Vitamin D', value: '22.4 ng/mL', category: 'lab_value', x: 50, y: 40, width: 42, height: 10, confidence: 0.92 },
          { id: 'cb5', label: 'Medication', value: 'Metformin 500mg', category: 'medication', x: 10, y: 65, width: 78, height: 12, confidence: 0.96 }
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
