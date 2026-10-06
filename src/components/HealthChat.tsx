import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Volume2, 
  RefreshCw
} from 'lucide-react';
import type { MedicalRecord, ChatMessage, SupportedLanguage } from '../types/health';
import { getTranslation, speakText } from '../services/aiHealthService';

interface HealthChatProps {
  currentRecord: MedicalRecord;
  selectedLanguage: SupportedLanguage;
}

export const HealthChat: React.FC<HealthChatProps> = ({
  currentRecord,
  selectedLanguage
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello Rahul! I am your AI Personal Health Copilot. I have analyzed your active record "${currentRecord.title}". You can ask me anything about your medications, abnormal lab values, diet restrictions, or discharge instructions.`,
      timestamp: 'Just now',
      suggestedActions: [
        'Explain my HbA1c level in plain language',
        'Can I take Metformin on an empty stomach?',
        'What foods should I avoid with high cholesterol?',
        'Summarize my record in Hindi'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { extractedData } = currentRecord;

  const handleSendMessage = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // AI Intelligence Response Logic
    setTimeout(() => {
      let aiResponseText = '';
      const lowerQuery = textToSend.toLowerCase();

      if (lowerQuery.includes('hba1c') || lowerQuery.includes('blood sugar') || lowerQuery.includes('sugar')) {
        const hba1cItem = extractedData.labValues.find(l => l.parameter.toLowerCase().includes('hba1c'));
        if (hba1cItem) {
          aiResponseText = `Your HbA1c is currently ${hba1cItem.value}% (${hba1cItem.referenceRange}). ${hba1cItem.plainExplanation} Your doctor has prescribed Metformin 500mg SR twice daily to help bring this toward the recommended target of under 7.0%.`;
        } else {
          aiResponseText = `Based on your prescription, you are being treated for Type 2 Diabetes Mellitus with Metformin 500mg SR. It is important to maintain low sugar intake and monitor blood sugar regularly.`;
        }
      } else if (lowerQuery.includes('metformin') || lowerQuery.includes('stomach') || lowerQuery.includes('empty')) {
        aiResponseText = `No, you should NOT take Metformin on an empty stomach. Taking Metformin SR right after a full morning breakfast or dinner helps prevent stomach upset, nausea, or cramping.`;
      } else if (lowerQuery.includes('food') || lowerQuery.includes('diet') || lowerQuery.includes('cholesterol') || lowerQuery.includes('avoid')) {
        aiResponseText = `Based on your health profile, key dietary tips include:\n• Avoid refined sugars, sweets, and sweetened beverages.\n• Limit saturated fats and fried foods to lower bad LDL cholesterol (currently 148 mg/dL).\n• Keep daily salt intake under 3 grams (half a teaspoon).\n• Drink 2.5 to 3 Liters of water daily.`;
      } else if (lowerQuery.includes('hindi') || lowerQuery.includes('हिंदी')) {
        aiResponseText = `आपकी मेडिकल रिपोर्ट का सारांश:\nआपकी ब्लड शुगर (HbA1c 8.2%) और कोलेस्ट्रॉल (148 mg/dL) अधिक है। डॉक्टर शर्मा ने मेटफॉर्मिन 500mg (खाने के बाद) और टेल्मीसार्टन 40mg (खाली पेट) लेने की सलाह दी है। कम नमक और चीनी का सेवन करें।`;
      } else if (lowerQuery.includes('aspirin') || lowerQuery.includes('clopidogrel') || lowerQuery.includes('stent')) {
        aiResponseText = `You are on Dual Antiplatelet Therapy (Aspirin + Clopidogrel) following your heart stent placement. Never stop taking these blood thinners without consulting your cardiologist, as they keep your stent open. Avoid over-the-counter NSAID painkillers like Ibuprofen/Brufen.`;
      } else {
        aiResponseText = `Based on your record "${currentRecord.title}", your health journey is currently tracking ${extractedData.diagnoses.length} condition(s) and ${extractedData.medications.length} active medication(s). Always maintain regular follow-ups with ${extractedData.doctorName || 'your doctor'}. Is there a specific parameter or medication you would like me to detail?`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {getTranslation(selectedLanguage, 'chatTitle')}
            </h2>
            <p className="text-xs text-slate-400">Grounded in active record: {currentRecord.title}</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-400" /> RAG Assistant Active
        </span>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div 
              key={msg.id}
              className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] space-y-2 ${
                isAi 
                  ? 'bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs shadow-md'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 rounded-2xl p-4 text-xs font-medium shadow-md shadow-teal-500/10'
              }`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold opacity-80">{isAi ? 'Health Copilot AI' : 'You'}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] opacity-70">{msg.timestamp}</span>
                    {isAi && (
                      <button 
                        onClick={() => speakText(msg.text, selectedLanguage)}
                        className="text-slate-400 hover:text-teal-400"
                        title="Speak response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold block">Suggested Questions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-300 text-[11px] border border-slate-800 transition-all text-left"
                        >
                          💬 {action}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-teal-400 animate-pulse pl-11">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Copilot is consulting medical records...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask a question about your lab results, dosages, or discharge instructions..."
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-teal-500 transition-all"
        />
        <button
          onClick={() => handleSendMessage()}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
};
