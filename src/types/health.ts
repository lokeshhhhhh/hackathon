// Types for AI-Powered Personal Health Copilot

export type DocumentCategory = 
  | 'prescription'
  | 'lab_report'
  | 'discharge_summary'
  | 'diagnostic_imaging'
  | 'vaccination'
  | 'general_record';

export type LabStatus = 'normal' | 'high' | 'low' | 'critical';

export interface OCRBoundingBox {
  id: string;
  label: string;
  value: string;
  category: 'medication' | 'lab_value' | 'diagnosis' | 'date' | 'doctor';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  confidence: number;
}

export interface MedicationItem {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string; // e.g. "1-0-1" or "Twice daily"
  timing: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  duration: string;
  instructions: string; // e.g. "Take after food"
  refillsLeft?: number;
  isBilingual?: boolean;
  regionalName?: string; // Hindi or regional script name
}

export interface LabValueItem {
  id: string;
  parameter: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: LabStatus;
  category: string; // e.g. "Glycemic Control", "Renal Function", "Hematology"
  plainExplanation: string; // Layman explanation
  potentialCauses?: string[];
  questionsForDoctor?: string[];
}

export interface DiagnosisItem {
  id: string;
  condition: string;
  icdCode?: string;
  severity: 'mild' | 'moderate' | 'severe' | 'chronic';
  status: 'active' | 'resolved' | 'suspected';
  plainDescription: string;
}

export interface DrugInteraction {
  id: string;
  severity: 'mild' | 'moderate' | 'severe';
  drugs: string[];
  description: string;
  recommendation: string;
}

export interface ExtractedMedicalData {
  documentTitle: string;
  date: string;
  doctorName?: string;
  facilityName?: string;
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  category: DocumentCategory;
  rawText: string;
  
  diagnoses: DiagnosisItem[];
  medications: MedicationItem[];
  labValues: LabValueItem[];
  
  plainLanguageSummary: string;
  abnormalValuesSummary: string;
  dietaryLifestyleTips: string[];
  drugInteractions: DrugInteraction[];
  followUpInstructions?: string;
  nextAppointmentDate?: string;
  
  ocrBoxes: OCRBoundingBox[];
}

export interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  previewUrl: string;
  extractedData: ExtractedMedicalData;
  fhirBundle?: FHIRBundle;
  isInvalidDocument?: boolean;
  validationErrorReason?: string;
}

// FHIR R4 Minimal Schema
export interface FHIRResource {
  resourceType: string;
  id: string;
  [key: string]: any;
}

export interface FHIRBundle {
  resourceType: 'Bundle';
  id: string;
  type: 'collection' | 'document';
  timestamp: string;
  entry: {
    fullUrl: string;
    resource: FHIRResource;
  }[];
}

// ABHA Profile Model
export interface ABHAProfile {
  abhaId: string; // e.g. "sharma.rahul@abdm"
  abhaNumber: string; // e.g. "91-4820-1928-3012"
  name: string;
  gender: string;
  dateOfBirth: string;
  mobile: string;
  isLinked: boolean;
  linkedDate?: string;
  phrAddress: string;
  healthRepository: string; // e.g. "Max Healthcare Health Repository"
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

// Supported languages
export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'mr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: string[];
}
