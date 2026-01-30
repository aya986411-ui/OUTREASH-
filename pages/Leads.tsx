import React from 'react';
import { Search, Filter, MoreHorizontal, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Lead } from '../types';

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    full_name: 'Sarah Connor',
    company_name: 'Cyberdyne Systems',
    job_title: 'CTO',
    email: 'sarah@cyberdyne.com',
    status: 'new',
    trigger_type: 'job_posting',
    trigger_date: '2023-10-25',
    industry: 'Technology',
    company_size: '1000+'
  },
  {
    id: '2',
    full_name: 'John Doe',
    company_name: 'Acme Corp',
    job_title: 'VP Sales',
    email: 'j.doe@acme.com',
    status: 'contacted',
    trigger_type: 'role_change',
    trigger_date: '2023-10-24',
    industry: 'Retail',
    company_size: '50-200'
  },
  {
    id: '3',
    full_name: 'Elena Fisher',
    company_name: 'Uncharted Co',
    job_title: 'Director of Marketing',
    email: 'elena@uncharted.com',
    status: 'replied',
    trigger_type: 'funding',
    trigger_date: '2023-10-23',
    industry: 'Travel',
    company_size: '200-500'
  },
];

const Leads: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Leads Discovery</h2>
          <p className="text-slate-400 mt-1">Manage and track your high-intent leads.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary/25">
          + Import Leads
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search leads by name, company..." 
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Lead Info</th>
                <th className="p-4 font-semibold">Trigger Event</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Enrichment</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                        {lead.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{lead.full_name}</p>
                        <p className="text-slate-400 text-xs">{lead.job_title} @ {lead.company_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                       <span className={`text-xs px-2 py-1 rounded-full w-fit font-medium mb-1 ${
                         lead.trigger_type === 'job_posting' ? 'bg-blue-500/20 text-blue-400' :
                         lead.trigger_type === 'funding' ? 'bg-green-500/20 text-green-400' :
                         'bg-orange-500/20 text-orange-400'
                       }`}>
                         {lead.trigger_type.replace('_', ' ')}
                       </span>
                       <span className="text-slate-500 text-xs">{lead.trigger_date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                      lead.status === 'new' ? 'bg-slate-700 text-slate-300' :
                      lead.status === 'contacted' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">
                    <div>{lead.industry}</div>
                    <div className="text-slate-500 text-xs">{lead.company_size} emp.</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white" title="View LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-700 text-center text-sm text-slate-500 hover:text-slate-400 cursor-pointer">
          View all 1,240 leads
        </div>
      </div>
    </div>
  );
};

export default Leads;
