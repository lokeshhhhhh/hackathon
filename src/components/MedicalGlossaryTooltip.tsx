import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface MedicalGlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

const MEDICAL_GLOSSARY: Record<string, { definition: string; category: string }> = {
  'hba1c': {
    definition: 'Average blood sugar level over the past 2 to 3 months. Normal is below 5.7%. Values above 6.5% indicate diabetes.',
    category: 'Glycemic Parameter'
  },
  'glycated': {
    definition: 'Sugar attached to proteins like red blood cell hemoglobin.',
    category: 'Biochemistry'
  },
  'creatinine': {
    definition: 'A waste product from normal muscle wear. Filtered out by healthy kidneys into urine.',
    category: 'Kidney Function'
  },
  'egfr': {
    definition: 'Estimated Glomerular Filtration Rate. Measures how well your kidneys filter waste from blood.',
    category: 'Kidney Function'
  },
  'ldl': {
    definition: 'Low-Density Lipoprotein ("Bad Cholesterol"). Can build up inside heart artery walls causing blockages.',
    category: 'Lipid Profile'
  },
  'hdl': {
    definition: 'High-Density Lipoprotein ("Good Cholesterol"). Helps carry bad cholesterol away from arteries.',
    category: 'Lipid Profile'
  },
  'hemoglobin': {
    definition: 'Protein inside red blood cells carrying oxygen from lungs to muscles and organs.',
    category: 'Hematology'
  },
  'pci': {
    definition: 'Percutaneous Coronary Intervention (Angioplasty). Procedure using a catheter to place a stent inside blocked heart arteries.',
    category: 'Cardiology Procedure'
  },
  'stent': {
    definition: 'A tiny expandable metallic mesh tube inserted into a heart artery to keep blood flowing open.',
    category: 'Medical Implant'
  },
  'stenosis': {
    definition: 'Abnormal narrowing of a blood vessel or heart valve reducing blood flow.',
    category: 'Vascular Condition'
  },
  'antiplatelet': {
    definition: 'Medication (like Aspirin or Clopidogrel) that prevents blood cells from clumping together to form dangerous clots inside stents.',
    category: 'Drug Class'
  },
  'metformin': {
    definition: 'First-line medication for Type 2 Diabetes that reduces sugar production by the liver and improves insulin sensitivity.',
    category: 'Antidiabetic Medication'
  },
  'telmisartan': {
    definition: 'Blood pressure medication (ARB) that relaxes blood vessels and protects kidney function in diabetic patients.',
    category: 'Antihypertensive'
  }
};

export const MedicalGlossaryTooltip: React.FC<MedicalGlossaryTooltipProps> = ({ term, children }) => {
  const [show, setShow] = useState(false);
  const normalizedKey = term.toLowerCase().trim();
  const entry = MEDICAL_GLOSSARY[normalizedKey];

  if (!entry) {
    return <span>{children || term}</span>;
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="underline decoration-dotted decoration-teal-400/80 cursor-help font-semibold text-teal-300 hover:text-teal-200 transition-colors">
        {children || term}
      </span>

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl z-50 text-xs pointer-events-none space-y-1">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-white capitalize flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-teal-400" /> {term}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-mono">
              {entry.category}
            </span>
          </div>
          <p className="text-slate-300 leading-normal text-[11px]">{entry.definition}</p>
        </div>
      )}
    </span>
  );
};
