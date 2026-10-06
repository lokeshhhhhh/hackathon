import type { MedicalRecord, ABHAProfile, LanguageOption } from '../types/health';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
];

export const INITIAL_ABHA_PROFILE: ABHAProfile = {
  abhaId: 'rahul.sharma92@abdm',
  abhaNumber: '91-4820-1928-3012',
  name: 'Rahul Sharma',
  gender: 'Male',
  dateOfBirth: '1982-06-15',
  mobile: '+91 98765 43210',
  isLinked: true,
  linkedDate: '2026-08-10',
  phrAddress: 'rahul.sharma92@abdm',
  healthRepository: 'ABDM Unified Health Repository - Fortis & Max Node',
  verificationStatus: 'verified'
};

export const SAMPLE_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-001',
    title: 'Bilingual Diabetes & Hypertension Prescription',
    date: '2026-09-28',
    category: 'prescription',
    fileName: 'dr_sharma_bilingual_prescription.png',
    fileSize: '1.2 MB',
    previewUrl: `${import.meta.env.BASE_URL}sample_medical_prescription.png`,
    extractedData: {
      documentTitle: 'Outpatient Clinical Prescription',
      date: '2026-09-28',
      doctorName: 'Dr. Rajesh Sharma, MD (Diabetology & Cardiology)',
      facilityName: 'City Healthcare & Diabetes Center, New Delhi',
      patientName: 'Rahul Sharma',
      patientAge: 44,
      patientGender: 'Male',
      category: 'prescription',
      rawText: `Dr. Rajesh Sharma, MD (Med)
Reg No: DMC/2014/8892
Patient: Rahul Sharma | Age: 44M | Date: 28-09-2026

Rx (Prescription / दवाइयाँ):
1. Tab. Metformin 500mg SR
   Dose: 1-0-1 (सुबह - शाम / Morning & Night)
   Instruction: खाने के बाद लें (Take after meals). Do not skip.
   Duration: 30 Days

2. Tab. Telmisartan 40mg
   Dose: 1-0-0 (सुबह खाली पेट / Morning empty stomach)
   Instruction: BP monitoring weekly.

3. Tab. Pantoprazole 40mg
   Dose: 1-0-0 (सुबह नाश्ते से 30 मिनट पहले / 30 mins before breakfast)

Advice / परहेज:
- कम नमक एवं कम चीनी का सेवन करें (Low Salt & Sugar diet)
- Daily 30 mins brisk walk
- Review with HbA1c report in 4 weeks`,
      diagnoses: [
        {
          id: 'diag-1',
          condition: 'Type 2 Diabetes Mellitus',
          icdCode: 'E11.9',
          severity: 'chronic',
          status: 'active',
          plainDescription: 'A long-term condition where the body cannot properly process blood sugar (glucose), requiring diet control and daily medication.'
        },
        {
          id: 'diag-2',
          condition: 'Essential Hypertension (High Blood Pressure)',
          icdCode: 'I10',
          severity: 'chronic',
          status: 'active',
          plainDescription: 'Consistently high pressure of blood flowing through your blood vessels, putting extra strain on your heart and kidneys.'
        }
      ],
      medications: [
        {
          id: 'med-1',
          name: 'Metformin SR',
          genericName: 'Metformin Hydrochloride (Sustained Release)',
          dosage: '500 mg',
          frequency: 'Twice daily (1-0-1)',
          timing: { morning: true, afternoon: false, evening: false, night: true },
          duration: '30 Days',
          instructions: 'Take immediately after morning breakfast and dinner to prevent stomach upset.',
          refillsLeft: 2,
          isBilingual: true,
          regionalName: 'मेटफॉर्मिन 500mg (खाने के बाद)'
        },
        {
          id: 'med-2',
          name: 'Telmisartan',
          genericName: 'Telmisartan (Angiotensin Receptor Blocker)',
          dosage: '40 mg',
          frequency: 'Once daily (1-0-0)',
          timing: { morning: true, afternoon: false, evening: false, night: false },
          duration: '30 Days',
          instructions: 'Take early morning with water. Helps lower blood pressure and protect kidney function.',
          refillsLeft: 3,
          isBilingual: true,
          regionalName: 'टेल्मीसार्टन 40mg (सुबह खाली पेट)'
        },
        {
          id: 'med-3',
          name: 'Pantoprazole',
          genericName: 'Pantoprazole Sodium (Proton Pump Inhibitor)',
          dosage: '40 mg',
          frequency: 'Once daily (1-0-0)',
          timing: { morning: true, afternoon: false, evening: false, night: false },
          duration: '15 Days',
          instructions: 'Take 30 minutes before morning breakfast to prevent acidity and reflux.',
          refillsLeft: 1,
          isBilingual: true,
          regionalName: 'पैंटोप्राजोल 40mg (नाश्ते से पहले)'
        }
      ],
      labValues: [],
      plainLanguageSummary: 'This is a routine outpatient prescription from Dr. Rajesh Sharma for controlling your blood sugar (Type 2 Diabetes) and blood pressure. You have been prescribed 3 daily oral medications: Metformin for sugar control, Telmisartan for blood pressure, and Pantoprazole for gastric acidity. Strict adherence to meal timings and daily exercise is recommended.',
      abnormalValuesSummary: 'No direct blood lab values reported in this document. However, your doctor noted that your blood pressure and glycemic levels require 4-week follow-up monitoring.',
      dietaryLifestyleTips: [
        'Strictly limit refined sugar, sweets, white bread, and sweetened beverages.',
        'Reduce daily sodium (salt) intake to less than 1 teaspoon (5 grams) per day.',
        'Engage in 30 minutes of moderate physical activity like brisk walking at least 5 days a week.',
        'Check blood pressure at home twice weekly and log the readings.'
      ],
      drugInteractions: [
        {
          id: 'int-1',
          severity: 'mild',
          drugs: ['Metformin', 'Food'],
          description: 'Metformin can cause mild stomach cramping or diarrhea if taken on an empty stomach.',
          recommendation: 'Always take Metformin during or right after a full meal.'
        }
      ],
      followUpInstructions: 'Return in 4 weeks with a fresh HbA1c & Fasting Blood Sugar report.',
      nextAppointmentDate: '2026-10-28',
      ocrBoxes: [
        { id: 'b1', label: 'Doctor Name', value: 'Dr. Rajesh Sharma, MD', category: 'doctor', x: 5, y: 4, width: 45, height: 8, confidence: 0.98 },
        { id: 'b2', label: 'Date', value: '28-09-2026', category: 'date', x: 70, y: 8, width: 25, height: 6, confidence: 0.96 },
        { id: 'b3', label: 'Medication 1', value: 'Metformin 500mg SR', category: 'medication', x: 8, y: 25, width: 55, height: 12, confidence: 0.94 },
        { id: 'b4', label: 'Hindi Instruction', value: 'खाने के बाद लें', category: 'medication', x: 12, y: 38, width: 40, height: 8, confidence: 0.91 },
        { id: 'b5', label: 'Medication 2', value: 'Telmisartan 40mg', category: 'medication', x: 8, y: 52, width: 50, height: 10, confidence: 0.95 },
        { id: 'b6', label: 'Medication 3', value: 'Pantoprazole 40mg', category: 'medication', x: 8, y: 68, width: 52, height: 10, confidence: 0.93 },
        { id: 'b7', label: 'Dietary Advice', value: 'कम नमक एवं कम चीनी', category: 'diagnosis', x: 8, y: 82, width: 60, height: 12, confidence: 0.89 }
      ]
    }
  },
  {
    id: 'rec-002',
    title: 'Comprehensive Blood & Metabolic Panel (Lab Report)',
    date: '2026-09-25',
    category: 'lab_report',
    fileName: 'max_healthcare_cbc_metabolic_report.pdf',
    fileSize: '2.4 MB',
    previewUrl: `${import.meta.env.BASE_URL}sample_blood_lab_report.png`,
    extractedData: {
      documentTitle: 'Comprehensive Blood Diagnostic Panel',
      date: '2026-09-25',
      doctorName: 'Dr. Sunita Varma, Pathologist',
      facilityName: 'Max Healthcare Super Speciality Lab, Saket',
      patientName: 'Rahul Sharma',
      patientAge: 44,
      patientGender: 'Male',
      category: 'lab_report',
      rawText: `MAX HEALTHCARE DIAGNOSTICS
Patient Name: Rahul Sharma | Ref Dr: Dr. Rajesh Sharma
Date: 25-Sep-2026 | Sample ID: MX-992019

TEST NAME                   RESULT      UNIT       REFERENCE RANGE   STATUS
---------------------------------------------------------------------------
HbA1c (Glycated Hb)         8.2         %          < 5.7 (Normal)    HIGH
Fasting Blood Sugar (FBS)   184         mg/dL      70 - 99           HIGH
Post-Prandial Sugar (PPBS)  245         mg/dL      < 140             HIGH

HEMATOLOGY:
Hemoglobin (Hb)             10.2        g/dL       13.0 - 17.0       LOW
Total WBC Count             7,400       /cu mm     4,000 - 11,000    NORMAL
Platelet Count              240,000     /cu mm     150,000-450,000   NORMAL

RENAL & LIPID PANEL:
Serum Creatinine            1.4         mg/dL      0.7 - 1.2         HIGH
eGFR                        58          mL/min     > 90              LOW
Total Cholesterol           230         mg/dL      < 200             HIGH
LDL (Bad Cholesterol)       148         mg/dL      < 100             HIGH
HDL (Good Cholesterol)      38          mg/dL      > 40              LOW`,
      diagnoses: [
        {
          id: 'diag-lab-1',
          condition: 'Uncontrolled Diabetes Mellitus (HbA1c > 8.0%)',
          icdCode: 'E11.65',
          severity: 'severe',
          status: 'active',
          plainDescription: 'Your blood sugar levels over the past 3 months have been significantly elevated, putting you at risk of diabetic complications if not adjusted.'
        },
        {
          id: 'diag-lab-2',
          condition: 'Mild Anemia (Low Hemoglobin)',
          icdCode: 'D64.9',
          severity: 'mild',
          status: 'active',
          plainDescription: 'Your red blood cell count or hemoglobin is lower than normal, which can cause tiredness or mild fatigue.'
        },
        {
          id: 'diag-lab-3',
          condition: 'Stage 2 Chronic Kidney Impairment (Elevated Creatinine)',
          icdCode: 'N18.2',
          severity: 'moderate',
          status: 'active',
          plainDescription: 'Creatinine is a waste product filtered by the kidneys. Higher levels indicate early reduction in kidney filtering capability.'
        }
      ],
      medications: [],
      labValues: [
        {
          id: 'lab-1',
          parameter: 'HbA1c (Glycated Hemoglobin)',
          value: 8.2,
          unit: '%',
          referenceRange: '< 5.7 %',
          status: 'high',
          category: 'Glycemic Control',
          plainExplanation: 'HbA1c measures your average blood sugar level over the past 2 to 3 months. A value of 8.2% indicates uncontrolled diabetes (target for diabetic adults is usually under 7.0%).',
          potentialCauses: ['Insufficient diabetes medication dose', 'High carbohydrate intake', 'Lack of consistent exercise'],
          questionsForDoctor: ['Should we intensify my diabetes medication or add a secondary drug?', 'How frequently should I check HbA1c?']
        },
        {
          id: 'lab-2',
          parameter: 'Fasting Blood Sugar',
          value: 184,
          unit: 'mg/dL',
          referenceRange: '70 - 99 mg/dL',
          status: 'high',
          category: 'Glycemic Control',
          plainExplanation: 'Fasting blood sugar measures glucose after 8 hours of overnight fasting. 184 mg/dL is high above the normal limit of 99 mg/dL.',
          potentialCauses: ['Overnight hepatic glucose release', 'Late night heavy dinners'],
          questionsForDoctor: ['Do I need night time insulin or dose adjustment for Metformin?']
        },
        {
          id: 'lab-3',
          parameter: 'Hemoglobin (Hb)',
          value: 10.2,
          unit: 'g/dL',
          referenceRange: '13.0 - 17.0 g/dL',
          status: 'low',
          category: 'Hematology',
          plainExplanation: 'Hemoglobin carries oxygen in your red blood cells. A level of 10.2 g/dL means mild anemia, which may cause mild fatigue or cold extremities.',
          potentialCauses: ['Dietary iron deficiency', 'Vitamin B12 or folate deficiency', 'Chronic disease mild suppression'],
          questionsForDoctor: ['Should I start an oral Iron supplement or adjust my diet with iron-rich foods?']
        },
        {
          id: 'lab-4',
          parameter: 'Serum Creatinine',
          value: 1.4,
          unit: 'mg/dL',
          referenceRange: '0.7 - 1.2 mg/dL',
          status: 'high',
          category: 'Renal Function',
          plainExplanation: 'Creatinine is a waste product from muscle breakdown filtered out by the kidneys. 1.4 mg/dL suggests your kidneys are working slightly harder than usual.',
          potentialCauses: ['Dehydration', 'Uncontrolled high blood pressure', 'Diabetic nephropathy risk'],
          questionsForDoctor: ['Is my kidney function safe for my current Metformin dosage?']
        },
        {
          id: 'lab-5',
          parameter: 'LDL Cholesterol (Bad)',
          value: 148,
          unit: 'mg/dL',
          referenceRange: '< 100 mg/dL',
          status: 'high',
          category: 'Lipid Profile',
          plainExplanation: 'LDL is the bad cholesterol that causes plaque buildup inside coronary arteries. 148 mg/dL is elevated.',
          potentialCauses: ['High saturated fat intake', 'Genetic lipid elevation'],
          questionsForDoctor: ['Should I start a Statin medication to lower LDL below 100 mg/dL?']
        }
      ],
      plainLanguageSummary: 'Your blood test reveals 3 key areas requiring medical attention: 1) High blood sugar (HbA1c 8.2%), indicating diabetes is currently above target; 2) Mild Anemia (Hemoglobin 10.2 g/dL); and 3) Early kidney strain (Serum Creatinine 1.4 mg/dL) alongside elevated bad LDL cholesterol (148 mg/dL). Immediate medical review with your physician is strongly recommended.',
      abnormalValuesSummary: 'CRITICAL ALERT: HbA1c (8.2%) and Fasting Glucose (184 mg/dL) are significantly high. Creatinine (1.4 mg/dL) shows mild renal strain. LDL Cholesterol (148 mg/dL) is high.',
      dietaryLifestyleTips: [
        'Increase intake of green leafy vegetables, lentils, and iron-rich foods (spinach, pomegranates).',
        'Avoid saturated fats, fried snacks, and trans fats to help bring down LDL cholesterol.',
        'Drink 2.5 to 3 Liters of water daily to support kidney function.',
        'Monitor home fasting sugar 3 times per week.'
      ],
      drugInteractions: [],
      followUpInstructions: 'Schedule an urgent follow-up consultation with your endocrinologist / diabetologist within 7 days.',
      ocrBoxes: [
        { id: 'lb1', label: 'HbA1c Result', value: '8.2 %', category: 'lab_value', x: 10, y: 22, width: 45, height: 10, confidence: 0.99 },
        { id: 'lb2', label: 'Fasting Glucose', value: '184 mg/dL', category: 'lab_value', x: 10, y: 35, width: 45, height: 10, confidence: 0.98 },
        { id: 'lb3', label: 'Hemoglobin', value: '10.2 g/dL', category: 'lab_value', x: 10, y: 50, width: 45, height: 10, confidence: 0.96 },
        { id: 'lb4', label: 'Creatinine', value: '1.4 mg/dL', category: 'lab_value', x: 10, y: 65, width: 45, height: 10, confidence: 0.95 },
        { id: 'lb5', label: 'LDL Cholesterol', value: '148 mg/dL', category: 'lab_value', x: 10, y: 80, width: 45, height: 10, confidence: 0.94 }
      ]
    }
  },
  {
    id: 'rec-003',
    title: 'Hospital Discharge Summary (Post Cardiac PCI Stent)',
    date: '2026-08-14',
    category: 'discharge_summary',
    fileName: 'fortis_cardiac_discharge_summary.pdf',
    fileSize: '3.1 MB',
    previewUrl: `${import.meta.env.BASE_URL}sample_blood_lab_report.png`,
    extractedData: {
      documentTitle: 'Inpatient Hospital Discharge Summary',
      date: '2026-08-14',
      doctorName: 'Dr. Ashok Seth, Chief Interventional Cardiologist',
      facilityName: 'Fortis Escorts Heart Institute, Okhla',
      patientName: 'Rahul Sharma',
      patientAge: 44,
      patientGender: 'Male',
      category: 'discharge_summary',
      rawText: `FORTIS ESCORTS HEART INSTITUTE
Discharge Date: 14-Aug-2026 | Admission Date: 11-Aug-2026
Diagnosis: Acute Coronary Syndrome (Unstable Angina), Single Vessel CAD (LAD 85% stenosis).
Procedure: Successful Percutaneous Coronary Intervention (PCI) with 1 Drug-Eluting Stent (DES) to LAD.

HOSPITAL COURSE:
Patient admitted with retrosternal chest discomfort. Emergency Coronary Angiogram performed. Successful angioplasty with Resolute Onyx DES (3.0 x 24 mm) to LAD. Post-procedure hemodynamic status stable. Echocardiogram LVEF 55%.

DISCHARGE MEDICATIONS:
1. Tab. Aspirin 75mg OD (After Lunch) - Lifelong
2. Tab. Clopidogrel 75mg OD (After Dinner) - 12 Months (Dual Antiplatelet Therapy)
3. Tab. Atorvastatin 40mg HS (Bedtime) - Daily
4. Tab. Metoprolol XL 25mg OD (Morning) - Daily

SPECIAL PRECAUTIONS:
- Do NOT stop Aspirin or Clopidogrel without cardiologist permission (stent thrombosis risk).
- Avoid heavy lifting (> 5 kg) for 2 weeks.
- Cardiac Rehab walking program: Start with 15 mins daily.`,
      diagnoses: [
        {
          id: 'diag-card-1',
          condition: 'Single Vessel Coronary Artery Disease (85% LAD Stenosis)',
          icdCode: 'I25.10',
          severity: 'severe',
          status: 'resolved',
          plainDescription: 'Blockage of 85% in the main heart artery (LAD) successfully opened up using a drug-eluting stent.'
        },
        {
          id: 'diag-card-2',
          condition: 'Post Percutaneous Coronary Intervention (PCI Stent)',
          icdCode: 'Z95.5',
          severity: 'moderate',
          status: 'active',
          plainDescription: 'A tiny metallic mesh stent was placed inside your heart artery to keep blood flowing smoothly.'
        }
      ],
      medications: [
        {
          id: 'med-card-1',
          name: 'Aspirin',
          genericName: 'Acetylsalicylic Acid (Antiplatelet)',
          dosage: '75 mg',
          frequency: 'Once daily (0-1-0)',
          timing: { morning: false, afternoon: true, evening: false, night: false },
          duration: 'Lifelong',
          instructions: 'Take after lunch. Blood thinner to prevent blood clots inside the heart stent.'
        },
        {
          id: 'med-card-2',
          name: 'Clopidogrel',
          genericName: 'Clopidogrel Bisulfate (Antiplatelet)',
          dosage: '75 mg',
          frequency: 'Once daily (0-0-0-1)',
          timing: { morning: false, afternoon: false, evening: false, night: true },
          duration: '12 Months',
          instructions: 'CRITICAL: Take every night after dinner without fail. Never miss a dose.'
        },
        {
          id: 'med-card-3',
          name: 'Atorvastatin',
          genericName: 'Atorvastatin Calcium (HMG-CoA Reductase Inhibitor)',
          dosage: '40 mg',
          frequency: 'Once daily (0-0-0-1)',
          timing: { morning: false, afternoon: false, evening: false, night: true },
          duration: 'Lifelong',
          instructions: 'Take at night. High-strength cholesterol medication to stabilize heart artery plaques.'
        },
        {
          id: 'med-card-4',
          name: 'Metoprolol Succinate XL',
          genericName: 'Metoprolol XL (Beta Blocker)',
          dosage: '25 mg',
          frequency: 'Once daily (1-0-0)',
          timing: { morning: true, afternoon: false, evening: false, night: false },
          duration: 'Lifelong',
          instructions: 'Take morning with breakfast. Slows down heart rate and reduces oxygen demand on heart muscles.'
        }
      ],
      labValues: [
        {
          id: 'lab-card-1',
          parameter: 'Left Ventricular Ejection Fraction (LVEF)',
          value: 55,
          unit: '%',
          referenceRange: '50 - 70 %',
          status: 'normal',
          category: 'Echocardiogram',
          plainExplanation: 'LVEF measures how effectively your heart pumps blood out with each beat. 55% is normal and healthy.'
        }
      ],
      plainLanguageSummary: 'This discharge summary details your successful heart angioplasty and stent placement at Fortis Escorts Heart Institute. The 85% blockage in your heart artery was cleared with a drug-eluting stent. You have been started on dual blood thinners (Aspirin & Clopidogrel) along with statin and beta-blocker therapy. Strict adherence to blood thinners is essential for stent protection.',
      abnormalValuesSummary: 'All vitals and post-stent cardiac pumping function (EF 55%) are stable.',
      dietaryLifestyleTips: [
        'Strict Salt Restriction: Keep total daily salt under 3 grams (half a teaspoon).',
        'Avoid strenuous lifting or pushing objects heavier than 5 kg for the first 14 days.',
        'Enroll in guided Cardiac Rehabilitation walking program starting with 15 mins daily.',
        'Report any chest tightness, shortness of breath, or bleeding/bruising immediately.'
      ],
      drugInteractions: [
        {
          id: 'int-card-1',
          severity: 'severe',
          drugs: ['Aspirin', 'Clopidogrel', 'Painkillers (NSAIDS like Ibuprofen)'],
          description: 'Taking over-the-counter NSAID painkillers (like Brufen/Voveran) with Aspirin+Clopidogrel sharply increases stomach bleeding risk.',
          recommendation: 'Avoid OTC painkillers. Use Paracetamol for mild pain only under doctor guidance.'
        }
      ],
      followUpInstructions: 'Visit Cardiologist OPD in 2 weeks for stent review and ECG check.',
      ocrBoxes: [
        { id: 'db1', label: 'Diagnosis', value: 'Single Vessel CAD (LAD 85%)', category: 'diagnosis', x: 8, y: 12, width: 60, height: 10, confidence: 0.98 },
        { id: 'db2', label: 'Procedure', value: 'PCI with DES Stent', category: 'diagnosis', x: 8, y: 26, width: 55, height: 10, confidence: 0.97 },
        { id: 'db3', label: 'Med 1', value: 'Aspirin 75mg OD', category: 'medication', x: 8, y: 50, width: 45, height: 8, confidence: 0.96 },
        { id: 'db4', label: 'Med 2', value: 'Clopidogrel 75mg OD', category: 'medication', x: 8, y: 62, width: 45, height: 8, confidence: 0.95 },
        { id: 'db5', label: 'Med 3', value: 'Atorvastatin 40mg HS', category: 'medication', x: 8, y: 74, width: 45, height: 8, confidence: 0.94 }
      ]
    }
  }
];
