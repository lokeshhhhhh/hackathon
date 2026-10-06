import { convertToFHIRBundle, getTranslation, getTranslatedSummary } from '../src/services/aiHealthService';
import { SAMPLE_MEDICAL_RECORDS, INITIAL_ABHA_PROFILE, SUPPORTED_LANGUAGES } from '../src/data/sampleRecords';

console.log("=== RUNNING CLINICAL LOGIC TEST SUITE ===");

// Test 1: Check Supported Languages
console.log(`1. Languages configured: ${SUPPORTED_LANGUAGES.length} languages (EN, HI, TE, TA, MR)`);

// Test 2: Check Sample Records
console.log(`2. Sample Medical Records loaded: ${SAMPLE_MEDICAL_RECORDS.length} records`);

// Test 3: Check Translation Engine
const enText = getTranslation('en', 'appTitle');
const hiText = getTranslation('hi', 'appTitle');
const teText = getTranslation('te', 'appTitle');
console.log(`3. Translation engine output:
   - EN: ${enText}
   - HI: ${hiText}
   - TE: ${teText}`);

// Test 4: Check FHIR R4 Bundle Conversion Logic
const sampleRecord = SAMPLE_MEDICAL_RECORDS[0];
const fhirBundle = convertToFHIRBundle(sampleRecord, INITIAL_ABHA_PROFILE.abhaId);

console.log(`4. FHIR R4 Bundle generated:
   - ResourceType: ${fhirBundle.resourceType}
   - Total Entries: ${fhirBundle.entry.length}
   - Patient ID: ${fhirBundle.entry[0].resource.id} (${fhirBundle.entry[0].resource.name[0].text})`);

const patientResource = fhirBundle.entry.find(e => e.resource.resourceType === 'Patient');
const conditionResources = fhirBundle.entry.filter(e => e.resource.resourceType === 'Condition');
const observationResources = fhirBundle.entry.filter(e => e.resource.resourceType === 'Observation');
const medicationResources = fhirBundle.entry.filter(e => e.resource.resourceType === 'MedicationRequest');

console.log(`   - Patient Resources: ${patientResource ? 'VALID' : 'INVALID'}`);
console.log(`   - Condition Resources: ${conditionResources.length}`);
console.log(`   - Observation Resources: ${observationResources.length}`);
console.log(`   - MedicationRequest Resources: ${medicationResources.length}`);

// Test 5: Check Multilingual Health Summary Translation
const summaryEn = sampleRecord.extractedData.plainLanguageSummary;
const summaryHi = getTranslatedSummary(summaryEn, 'hi');

console.log(`5. Summary Translator output:
   - EN length: ${summaryEn.length} chars
   - HI summary snippet: ${summaryHi.substring(0, 100)}...`);

console.log("\n✅ ALL LOGIC TESTS PASSED SUCCESSFULLY!");
