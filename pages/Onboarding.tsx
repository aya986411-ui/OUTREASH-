import React, { useState } from 'react';
import { 
  Target, MessageSquare, Settings, ShieldCheck, ChevronRight, ChevronLeft, 
  Save, CheckCircle2, AlertCircle, Play 
} from 'lucide-react';

interface OnboardingProps {
  onComplete?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Strategy
    targetAudience: '',
    industries: [] as string[],
    painPoints: '',
    offerHook: '',
    // Messaging
    tone: 'professional',
    successStory: '',
    // Technical
    channels: ['email'],
    dailyLimit: 'moderate',
    triggers: [] as string[],
    // Compliance
    gdpr: false,
    canSpam: false,
    noSpam: false
  });

  const steps = [
    { id: 1, title: 'Strategy & Persona', icon: Target },
    { id: 2, title: 'Messaging & Offer', icon: MessageSquare },
    { id: 3, title: 'Technical Setup', icon: Settings },
    { id: 4, title: 'Launch', icon: ShieldCheck },
  ];

  const toggleArrayItem = (field: 'industries' | 'channels' | 'triggers', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">New Client Onboarding</h2>
        <p className="text-slate-400 mt-1">Configure the AI system for a new client in 4 simple steps.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 rounded-full" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = step >= s.id;
          const isCurrent = step === s.id;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-background px-2">
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                  isActive 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-slate-500'}`}>{s.title}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content Card */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        
        {/* Step 1: Strategy */}
        {step === 1 && (
          <div className="p-8 space-y-8 animate-fade-in">
            <div className="flex gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-bold mb-1">Define the "Who"</p>
                <p className="opacity-80">Avoid generic answers like "B2B Companies". Be specific: "Marketing Directors at SaaS companies with 50+ employees in UAE".</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience Description</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-32"
                  placeholder="e.g. Marketing Agencies in Jordan and Gulf region with 5-20 employees..."
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Industries</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['SaaS', 'Marketing Agency', 'E-commerce', 'Real Estate', 'Consulting', 'Finance', 'Healthcare', 'Other'].map(opt => (
                    <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.industries.includes(opt) ? 'bg-primary/20 border-primary text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={formData.industries.includes(opt)}
                        onChange={() => toggleArrayItem('industries', opt)}
                      />
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Messaging */}
        {step === 2 && (
          <div className="p-8 space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">The Pain Point <span className="text-slate-500">(Problem)</span></label>
                   <textarea 
                     className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary outline-none h-32"
                     placeholder="What keeps them up at night? e.g. Unpredictable revenue stream..."
                     value={formData.painPoints}
                     onChange={(e) => setFormData({...formData, painPoints: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">The Hook <span className="text-slate-500">(Irresistible Offer)</span></label>
                   <textarea 
                     className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary outline-none h-32"
                     placeholder="e.g. 15 qualified meetings in 30 days or you don't pay..."
                     value={formData.offerHook}
                     onChange={(e) => setFormData({...formData, offerHook: e.target.value})}
                   />
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-3">Tone of Voice</label>
                   <div className="space-y-2">
                     {[
                       { id: 'professional', label: 'Professional & Formal', desc: 'Trustworthy, corporate' },
                       { id: 'friendly', label: 'Friendly & Approachable', desc: 'Warm, relationship-focused' },
                       { id: 'casual', label: 'Casual & Conversational', desc: 'Direct, like a peer' },
                       { id: 'bold', label: 'Bold & Direct', desc: 'Sales-focused, high energy' },
                     ].map(t => (
                       <div 
                         key={t.id}
                         onClick={() => setFormData({...formData, tone: t.id})}
                         className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                           formData.tone === t.id ? 'bg-secondary/10 border-secondary' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'
                         }`}
                       >
                         <div>
                           <p className={`font-bold ${formData.tone === t.id ? 'text-secondary' : 'text-slate-200'}`}>{t.label}</p>
                           <p className="text-xs text-slate-500">{t.desc}</p>
                         </div>
                         {formData.tone === t.id && <CheckCircle2 className="w-5 h-5 text-secondary" />}
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Step 3: Technical */}
        {step === 3 && (
          <div className="p-8 space-y-8 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Outreach Channels</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {['Email', 'LinkedIn', 'WhatsApp'].map(ch => {
                   const val = ch.toLowerCase();
                   return (
                    <div 
                      key={val}
                      onClick={() => toggleArrayItem('channels', val)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                        formData.channels.includes(val) ? 'bg-primary/20 border-primary' : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                         formData.channels.includes(val) ? 'bg-primary border-primary' : 'border-slate-500'
                      }`}>
                        {formData.channels.includes(val) && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium text-white">{ch}</span>
                    </div>
                   );
                 })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Daily Limits Strategy</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { id: 'conservative', label: 'Conservative', count: '30/day', desc: 'Safest, slow ramp-up' },
                   { id: 'moderate', label: 'Moderate', count: '75/day', desc: 'Balanced growth' },
                   { id: 'aggressive', label: 'Aggressive', count: '150+/day', desc: 'Max speed, higher risk' },
                 ].map(limit => (
                    <div 
                      key={limit.id}
                      onClick={() => setFormData({...formData, dailyLimit: limit.id})}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.dailyLimit === limit.id ? 'bg-emerald-500/10 border-emerald-500' : 'bg-slate-900 border-slate-700'
                      }`}
                    >
                      <p className={`font-bold ${formData.dailyLimit === limit.id ? 'text-emerald-400' : 'text-slate-200'}`}>{limit.label}</p>
                      <p className="text-xl font-bold text-white my-1">{limit.count}</p>
                      <p className="text-xs text-slate-500">{limit.desc}</p>
                    </div>
                 ))}
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-300 mb-3">Automation Triggers</label>
               <div className="grid grid-cols-2 gap-3">
                 {['Job Postings (Hiring)', 'Role Changes (New Job)', 'Funding Rounds', 'Company Expansion'].map(t => (
                   <label key={t} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.triggers.includes(t) ? 'bg-orange-500/10 border-orange-500 text-orange-200' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={formData.triggers.includes(t)}
                      onChange={() => toggleArrayItem('triggers', t)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                       formData.triggers.includes(t) ? 'bg-orange-500 border-orange-500' : 'border-slate-600'
                    }`}>
                       {formData.triggers.includes(t) && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium">{t}</span>
                  </label>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Step 4: Launch */}
        {step === 4 && (
          <div className="p-8 space-y-8 animate-fade-in">
             <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <ShieldCheck className="text-green-500" /> Compliance & Safety
               </h3>
               <div className="space-y-4">
                 {[
                   { id: 'gdpr', label: 'I agree to comply with GDPR & CAN-SPAM regulations' },
                   { id: 'canSpam', label: 'I confirm the connected email accounts are authorized' },
                   { id: 'noSpam', label: 'I will provide an Unsubscribe option in all emails' }
                 ].map(item => (
                   <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                       (formData as any)[item.id] ? 'bg-green-500 border-green-500' : 'border-slate-500 group-hover:border-green-500'
                     }`}>
                       <input 
                         type="checkbox" 
                         className="hidden"
                         checked={(formData as any)[item.id]}
                         onChange={(e) => setFormData({...formData, [item.id]: e.target.checked})}
                       />
                       {(formData as any)[item.id] && <CheckCircle2 className="w-4 h-4 text-white" />}
                     </div>
                     <span className={`text-sm ${(formData as any)[item.id] ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
                   </label>
                 ))}
               </div>
             </div>

             <div className="border-t border-slate-700 pt-6">
                <h4 className="font-bold text-white mb-4">Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 block text-xs uppercase mb-1">Target</span>
                    <span className="text-slate-200">{formData.targetAudience || 'Not specified'}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-slate-500 block text-xs uppercase mb-1">Strategy</span>
                    <span className="text-slate-200 capitalize">{formData.dailyLimit} mode via {formData.channels.join(', ')}</span>
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex justify-between items-center">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-slate-400 font-medium hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={() => setStep(s => Math.min(4, s + 1))}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-primary/25 flex items-center gap-2 transition-all"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
             <button 
              onClick={onComplete}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-green-500/25 flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" /> Launch System
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;