import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, Copy, Check } from 'lucide-react';
import { Lead, GeneratedMessage } from '../types';
import { generateOutreachMessage } from '../services/geminiService';

const MessageGenerator: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<GeneratedMessage | null>(null);
  const [tone, setTone] = useState<'professional' | 'friendly' | 'direct'>('professional');
  const [copied, setCopied] = useState(false);

  // Mock lead for demo purposes
  const demoLead: Lead = {
    id: 'demo-1',
    full_name: 'James Rodriguez',
    company_name: 'TechFlow Solutions',
    job_title: 'VP of Engineering',
    email: 'james@techflow.io',
    status: 'new',
    trigger_type: 'job_posting',
    trigger_date: '2023-11-01',
    industry: 'SaaS',
    pain_points: ['Slow hiring process', 'Developer burnout', 'Legacy code issues']
  };

  const handleGenerate = async () => {
    if (!selectedLead) return;
    setIsGenerating(true);
    try {
      const result = await generateOutreachMessage(selectedLead, tone);
      setGeneratedMessage(result);
    } catch (error) {
      console.error("Failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedMessage) {
      const text = `Subject: ${generatedMessage.subject}\n\n${generatedMessage.body}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col lg:flex-row gap-6 animate-fade-in">
      {/* Left Panel: Configuration */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            AI Writer <Sparkles className="w-6 h-6 text-primary" />
          </h2>
          <p className="text-slate-400 mt-1">Generate hyper-personalized outreach messages.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Lead</label>
            <div 
              onClick={() => setSelectedLead(demoLead)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedLead ? 'bg-primary/10 border-primary' : 'bg-slate-900 border-slate-700 hover:border-slate-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                  {demoLead.full_name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{demoLead.full_name}</p>
                  <p className="text-xs text-slate-400">{demoLead.job_title} @ {demoLead.company_name}</p>
                </div>
              </div>
              {selectedLead && (
                 <div className="mt-3 text-xs text-slate-400 border-t border-slate-700/50 pt-2 space-y-1">
                    <p><span className="text-slate-500">Trigger:</span> {demoLead.trigger_type}</p>
                    <p><span className="text-slate-500">Pain Points:</span> {demoLead.pain_points?.join(', ')}</p>
                 </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message Tone</label>
            <div className="grid grid-cols-3 gap-2">
              {['professional', 'friendly', 'direct'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    tone === t 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/25' 
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedLead || isGenerating}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Message
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Panel: Result */}
      <div className="flex-1 bg-slate-900/50 rounded-3xl border border-slate-800 p-6 lg:p-8 flex flex-col relative overflow-hidden">
        {!generatedMessage ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center">
               <Send className="w-8 h-8 opacity-50" />
            </div>
            <p>Select a lead and click Generate to see the magic.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-6 animate-fade-in-up">
            {/* Analysis Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> AI Analysis
              </h4>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                {generatedMessage.analysis}
              </p>
            </div>

            {/* Email Preview */}
            <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 text-slate-800 relative">
               <div className="border-b border-gray-200 pb-4 mb-6">
                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Subject</p>
                 <h3 className="text-lg font-bold text-gray-900">{generatedMessage.subject}</h3>
               </div>
               <div className="prose prose-slate max-w-none whitespace-pre-wrap font-medium text-gray-600">
                 {generatedMessage.body}
               </div>

               <div className="absolute top-4 right-4 flex gap-2">
                 <button 
                   onClick={copyToClipboard}
                   className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                   title="Copy to clipboard"
                 >
                   {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                 </button>
               </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={handleGenerate}
                className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Regenerate
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageGenerator;
