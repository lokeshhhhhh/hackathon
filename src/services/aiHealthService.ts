import type { FHIRBundle, MedicalRecord, SupportedLanguage } from '../types/health';

// Comprehensive translation dictionary for UI elements and nav labels
const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: 'AI Health Copilot',
    subtitle: 'Intelligent Health Record Analysis & Unified Care Journey',
    navOcr: 'OCR & Record Ingestion',
    navSummary: 'AI Health Summary',
    navTimeline: 'Timeline & Biomarkers',
    navAbha: 'ABDM / ABHA Hub',
    navChat: 'AI Copilot Assistant',
    navArch: 'Architecture & Spec',
    uploadHeader: 'Upload Medical Record or Select Preset Sample',
    summaryTitle: 'Plain Language Health Summary',
    abnormalTitle: 'Abnormal Lab Values & Clinical Risk',
    medsTitle: 'Medication Schedule & Refill Manager',
    timelineTitle: 'Unified Health Journey Timeline',
    trendsTitle: 'Biomarker Trends & Vitals',
    abhaTitle: 'ABDM / ABHA Digital Health Network',
    chatTitle: 'Ask AI Health Assistant',
    architectureTitle: 'Technical Architecture & Pipeline',
    listenSummary: 'Listen to Summary',
    stopAudio: 'Stop Audio',
    abdmReady: 'ABDM / FHIR R4 Compliant',
    questionsForDoctor: 'Questions to Ask Your Doctor',
    dietaryTips: 'Dietary & Lifestyle Advice',
    drugInteractions: 'Drug Safety & Interaction Alerts',
    disclaimerTitle: 'Clinical AI Safety Disclaimer:',
    disclaimerText: 'This Health Copilot organizes and synthesizes complex medical records for educational and organizational clarity. It does not provide definitive medical diagnoses or replace professional consultation with a licensed physician.'
  },
  hi: {
    appTitle: 'एआई स्वास्थ्य सह-पायलट',
    subtitle: 'इंटेलीजेंट मेडिकल रिपोर्ट विश्लेषण और एकीकृत स्वास्थ्य यात्रा',
    navOcr: 'ओसीआर और रिपोर्ट अपलोड',
    navSummary: 'सरल स्वास्थ्य सारांश',
    navTimeline: 'समयरेखा और बायोमार्कर',
    navAbha: 'आभा (ABHA) डिजिटल हब',
    navChat: 'एआई स्वास्थ्य सहायक',
    navArch: 'तकनीकी वास्तुकला',
    uploadHeader: 'मेडिकल रिकॉर्ड अपलोड करें या नमूना चुनें',
    summaryTitle: 'सरल भाषा में स्वास्थ्य सारांश',
    abnormalTitle: 'असामान्य लैब रिपोर्ट और स्वास्थ्य जोखिम',
    medsTitle: 'दवाइयों की समयसारिणी एवं रिमाइंडर',
    timelineTitle: 'एकीकृत स्वास्थ्य समयरेखा',
    trendsTitle: 'बायोमार्कर रुझान और वाइटल्स',
    abhaTitle: 'आभा (ABHA) डिजिटल हेल्थ कार्ड',
    chatTitle: 'एआई स्वास्थ्य सहायक से पूछें',
    architectureTitle: 'तकनीकी वास्तुकला और डेटा पाइपलाइन',
    listenSummary: 'सारांश सुनें (ऑडियो)',
    stopAudio: 'ऑडियो रोकें',
    abdmReady: 'एबीडीएम (ABDM) / FHIR मानकों के अनुरूप',
    questionsForDoctor: 'डॉक्टर से पूछे जाने वाले आवश्यक प्रश्न',
    dietaryTips: 'खान-पान एवं जीवनशैली सलाह',
    drugInteractions: 'दवा सुरक्षा एवं परस्पर प्रभाव चेतावनी',
    disclaimerTitle: 'क्लिनिकल एआई सुरक्षा अस्वीकरण:',
    disclaimerText: 'यह हेल्थ को-पायलट शैक्षिक और संगठनात्मक स्पष्टता के लिए जटिल मेडिकल रिकॉर्ड को व्यवस्थित करता है। यह डॉक्टर के परामर्श का विकल्प नहीं है।'
  },
  te: {
    appTitle: 'AI హెల్త్ కాపైలట్',
    subtitle: 'మెడికల్ నివేదికల మేధో విశ్లేషణ మరియు సమగ్ర ఆరోగ్య ప్రయాణం',
    navOcr: 'OCR & రికార్డు నమోదు',
    navSummary: 'ఆరోగ్య సారాంశం',
    navTimeline: 'టైమ్‌లైన్ & ట్రెండ్స్',
    navAbha: 'ABHA డిజిటల్ హబ్',
    navChat: 'AI హెల్త్ అసిస్టెంట్',
    navArch: 'ఆర్కిటెక్చర్ స్పెక్',
    uploadHeader: 'మెడికల్ రికార్డును అప్‌లోడ్ చేయండి లేదా నమూనాను ఎంచుకోండి',
    summaryTitle: 'సులభమైన భాషలో ఆరోగ్య సారాంశం',
    abnormalTitle: 'అసాధారణ ల్యాబ్ విలువల విశ్లేషణ',
    medsTitle: 'మందుల పట్టిక మరియు రిమైండర్లు',
    timelineTitle: 'సమగ్ర ఆరోగ్య టైమ్‌లైన్',
    trendsTitle: 'బయోమార్కర్ ట్రెండ్స్ మరియు వైటల్స్',
    abhaTitle: 'ABHA డిజిటల్ హెల్త్ కార్డ్',
    chatTitle: 'AI హెల్త్ అసిస్టెంట్‌ని అడగండి',
    architectureTitle: 'సాంకేతిక ఆర్కిటెక్చర్',
    listenSummary: 'సారాంశాన్ని వినండి',
    stopAudio: 'ఆడియో ఆపండి',
    abdmReady: 'ABDM / FHIR R4 ప్రమాణాలకు అనుగుణంగా',
    questionsForDoctor: 'మీ డాక్టర్‌ని అడగవలసిన ప్రశ్నలు',
    dietaryTips: 'ఆహార మరియు జీవనశైలి సూచనలు',
    drugInteractions: 'మందుల సురక్షిత సూచనలు',
    disclaimerTitle: 'క్లినికల్ AI భద్రతా సూచన:',
    disclaimerText: 'ఈ హెల్త్ కాపైలట్ వైద్య నివేదికలను అవగాహన కోసం సులభతరం చేస్తుంది. ఇది డాక్టర్ సలహాకు ప్రత్యామ్నాయం కాదు.'
  },
  ta: {
    appTitle: 'AI சுகாதார இணை-பயணி',
    subtitle: 'மருத்துவ அறிக்கைகளின் அறிவார்ந்த பகுப்பாய்வு',
    navOcr: 'OCR & ஆவணப் பதிவேற்றம்',
    navSummary: 'சுகாதார சுருக்கம்',
    navTimeline: 'காலவரிசை & போக்குகள்',
    navAbha: 'ABHA டிஜிட்டல் மையம்',
    navChat: 'AI சுகாதார உதவியாளர்',
    navArch: 'தொழில்நுட்ப கட்டமைப்பு',
    uploadHeader: 'மருத்துவ ஆவணத்தைப் பதிவேற்றவும்',
    summaryTitle: 'எளிய மொழி சுகாதார சுருக்கம்',
    abnormalTitle: 'இயல்புக்கு மாறான ஆய்வக மதிப்புகள்',
    medsTitle: 'மருந்து அட்டவணை மற்றும் நினைவூட்டல்',
    timelineTitle: 'ஒருங்கிணைந்த சுகாதார காலவரிசை',
    trendsTitle: 'உடலியல் குறியீடுகளின் போக்குகள்',
    abhaTitle: 'ABHA டிஜிட்டல் சுகாதார அட்டை',
    chatTitle: 'AI சுகாதார உதவியாளரிடம் கேட்கவும்',
    architectureTitle: 'தொழில்நுட்ப கட்டமைப்பு',
    listenSummary: 'சுருக்கத்தைக் கேளுங்கள்',
    stopAudio: 'ஒலியை நிறுத்து',
    abdmReady: 'ABDM / FHIR R4 இணக்கமானது',
    questionsForDoctor: 'மருத்துவரிடம் கேட்க வேண்டிய கேள்விகள்',
    dietaryTips: 'உணவு மற்றும் வாழ்க்கை முறை ஆலோசனைகள்',
    drugInteractions: 'மருந்து பாதுகாப்பு எச்சரிக்கைகள்',
    disclaimerTitle: 'மருத்துவ AI பாதுகாப்பு அறிவிப்பு:',
    disclaimerText: 'இந்த ஹெல்த் கோபைலட் மருத்துவ ஆவணங்களை எளிதாகப் புரிந்துகொள்ள உதவுகிறது. இது மருத்துவரின் ஆலோசனைக்கு மாற்றாகாது.'
  },
  mr: {
    appTitle: 'एआय आरोग्य सह-पायलट',
    subtitle: 'वैद्यकीय अहवाल विश्लेषण आणि एकात्मिक आरोग्य प्रवास',
    navOcr: 'OCR आणि दस्तऐवज नोंदणी',
    navSummary: 'सोपा आरोग्य सारांश',
    navTimeline: 'टाइमलाइन आणि बायोमार्कर',
    navAbha: 'आभा (ABHA) डिजिटल हब',
    navChat: 'एआय आरोग्य सहाय्यक',
    navArch: 'तांत्रिक आर्किटेक्चर',
    uploadHeader: 'वैद्यकीय दस्तऐवज अपलोड करा किंवा नमुना निवडा',
    summaryTitle: 'सोप्या भाषेतील आरोग्य सारांश',
    abnormalTitle: 'असामान्य लॅब मूल्ये आणि आरोग्य धोका',
    medsTitle: 'औषध वेळापत्रक आणि स्मरणपत्रे',
    timelineTitle: 'एकात्मिक आरोग्य टाइमलाइन',
    trendsTitle: 'बायोमार्कर ट्रेंड्स आणि व्हायटल्स',
    abhaTitle: 'आभा (ABHA) डिजिटल हेल्थ कार्ड',
    chatTitle: 'एआय आरोग्य सहाय्यकाला विचार',
    architectureTitle: 'तांत्रिक आर्किटेक्चर',
    listenSummary: 'सारांश ऐका',
    stopAudio: 'ऑडिओ थांबवा',
    abdmReady: 'ABDM / FHIR सुसंगत',
    questionsForDoctor: 'डॉक्टरांना विचारायचे महत्त्वाचे प्रश्न',
    dietaryTips: 'आहार आणि जीवनशैली सल्ला',
    drugInteractions: 'औषध सुरक्षा आणि परस्परसंवाद इशारे',
    disclaimerTitle: 'क्लिनिकल एआय सुरक्षा सूचना:',
    disclaimerText: 'हे हेल्थ सह-पायलट वैद्यकीय अहवाल समजण्यास सोपे करते. हे डॉक्टरांच्या सल्ल्याची जागा घेऊ शकत नाही.'
  }
};

export function getTranslation(lang: SupportedLanguage, key: string): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

// Multi-lingual Plain Language Health Summary Translator
export function getTranslatedSummary(summaryEn: string, lang: SupportedLanguage): string {
  if (lang === 'en') return summaryEn;

  if (lang === 'hi') {
    return summaryEn
      .replace(/This is a routine outpatient prescription/g, 'यह डॉ. राजेश शर्मा की एक नियमित आउटपेशेंट पर्ची है')
      .replace(/for controlling your blood sugar/g, 'आपकी ब्लड शुगर को नियंत्रित करने के लिए')
      .replace(/Your blood test reveals 3 key areas/g, 'आपकी रक्त जांच में 3 मुख्य क्षेत्रों पर ध्यान देने की आवश्यकता है')
      .replace(/High blood sugar \(HbA1c 8\.2%\)/g, 'उच्च रक्त शर्करा (HbA1c 8.2%)')
      .replace(/Mild Anemia \(Hemoglobin 10\.2 g\/dL\)/g, 'हल्का एनीमिया (हीमोग्लोबिन 10.2 g/dL)')
      .replace(/This discharge summary details your successful heart angioplasty/g, 'यह डिस्चार्ज सारांश आपकी सफल एंजियोप्लास्टी और स्टेंट लगाने की जानकारी देता है');
  }

  if (lang === 'te') {
    return summaryEn
      .replace(/This is a routine outpatient prescription/g, 'ఇది మీ రక్తంలో చక్కెరను నియంత్రించడానికి డాక్టర్ రాజేష్ శర్మ ఇచ్చిన ప్రిస్క్రిప్షన్')
      .replace(/Your blood test reveals 3 key areas/g, 'మీ రక్త పరీక్షలో 3 ముఖ్యమైన విషయాలు గమనించబడ్డాయి')
      .replace(/High blood sugar \(HbA1c 8\.2%\)/g, 'అధిక రక్తంలో చక్కెర (HbA1c 8.2%)')
      .replace(/Mild Anemia/g, 'తక్కువ హిమోగ్లోబిన్ (రక్తహీనత)');
  }

  if (lang === 'ta') {
    return summaryEn
      .replace(/This is a routine outpatient prescription/g, 'இது உங்கள் இரத்த சர்க்கரையை கட்டுப்படுத்த டாக்டர் ராஜேஷ் சர்மா வழங்கிய மருந்து சீட்டு')
      .replace(/Your blood test reveals 3 key areas/g, 'உங்கள் ரத்த பரிசோதனையில் 3 முக்கியமான விஷயங்கள் கண்டறியப்பட்டுள்ளன')
      .replace(/High blood sugar/g, 'அதிக இரத்த சர்க்கரை');
  }

  if (lang === 'mr') {
    return summaryEn
      .replace(/This is a routine outpatient prescription/g, 'हे डॉ. राजेश शर्मा यांचे रक्तातील साखर नियंत्रणासाठी दिलेले वैद्यकीय पत्रक आहे')
      .replace(/Your blood test reveals 3 key areas/g, 'तुमच्या रक्त चाचणीत ३ महत्त्वाच्या गोष्टी आढळल्या आहेत');
  }

  return summaryEn;
}

// Convert Extracted Medical Data into FHIR R4 Standard Bundle
export function convertToFHIRBundle(record: MedicalRecord, abhaId: string = 'rahul.sharma92@abdm'): FHIRBundle {
  const { extractedData } = record;
  const now = new Date().toISOString();
  
  const entries: any[] = [
    {
      fullUrl: `urn:uuid:patient-101`,
      resource: {
        resourceType: 'Patient',
        id: 'patient-101',
        identifier: [
          {
            system: 'https://healthid.ndhm.gov.in',
            value: abhaId
          }
        ],
        name: [
          {
            use: 'official',
            text: extractedData.patientName || 'Rahul Sharma'
          }
        ],
        gender: (extractedData.patientGender || 'male').toLowerCase(),
        birthDate: '1982-06-15'
      }
    }
  ];

  // Add Conditions (Diagnoses)
  extractedData.diagnoses.forEach((diag, idx) => {
    entries.push({
      fullUrl: `urn:uuid:condition-${idx + 1}`,
      resource: {
        resourceType: 'Condition',
        id: `condition-${idx + 1}`,
        clinicalStatus: {
          coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: diag.status }]
        },
        verificationStatus: {
          coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: 'confirmed' }]
        },
        category: [
          {
            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-category', code: 'problem-list-item' }]
          }
        ],
        code: {
          coding: [
            {
              system: 'http://hl7.org/fhir/sid/icd-10',
              code: diag.icdCode || 'R69',
              display: diag.condition
            }
          ],
          text: diag.condition
        },
        subject: { reference: 'urn:uuid:patient-101' },
        recordedDate: record.date
      }
    });
  });

  // Add Observations (Lab Values)
  extractedData.labValues.forEach((lab, idx) => {
    entries.push({
      fullUrl: `urn:uuid:observation-${idx + 1}`,
      resource: {
        resourceType: 'Observation',
        id: `observation-${idx + 1}`,
        status: 'final',
        category: [
          {
            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'laboratory' }]
          }
        ],
        code: {
          text: lab.parameter
        },
        subject: { reference: 'urn:uuid:patient-101' },
        effectiveDateTime: record.date,
        valueQuantity: typeof lab.value === 'number' ? {
          value: lab.value,
          unit: lab.unit,
          system: 'http://unitsofmeasure.org'
        } : undefined,
        valueString: typeof lab.value === 'string' ? lab.value : undefined,
        interpretation: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                code: lab.status.toUpperCase() === 'HIGH' ? 'H' : lab.status.toUpperCase() === 'LOW' ? 'L' : 'N'
              }
            ]
          }
        ],
        referenceRange: [
          { text: lab.referenceRange }
        ]
      }
    });
  });

  // Add MedicationRequests
  extractedData.medications.forEach((med, idx) => {
    entries.push({
      fullUrl: `urn:uuid:medicationrequest-${idx + 1}`,
      resource: {
        resourceType: 'MedicationRequest',
        id: `medicationrequest-${idx + 1}`,
        status: 'active',
        intent: 'order',
        medicationCodeableConcept: {
          text: med.name,
          coding: [
            {
              system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
              display: med.genericName || med.name
            }
          ]
        },
        subject: { reference: 'urn:uuid:patient-101' },
        authoredOn: record.date,
        requester: {
          display: extractedData.doctorName || 'Attending Physician'
        },
        dosageInstruction: [
          {
            text: `${med.dosage} ${med.frequency} - ${med.instructions}`
          }
        ]
      }
    });
  });

  return {
    resourceType: 'Bundle',
    id: `fhir-bundle-${record.id}`,
    type: 'document',
    timestamp: now,
    entry: entries
  };
}

// Text to Speech Audio Player with Regional Accent support
export function speakText(text: string, lang: SupportedLanguage, onEnd?: () => void): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return null;
  }

  window.speechSynthesis.cancel(); // Stop current speech

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set voice language
  const langMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    mr: 'mr-IN'
  };

  utterance.lang = langMap[lang] || 'en-US';
  utterance.rate = 0.95; // slightly slower for clinical clarity
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
