import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { TrendingUp, Users, Mail, MessageSquare, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Mon', sent: 400, replies: 24 },
  { name: 'Tue', sent: 300, replies: 18 },
  { name: 'Wed', sent: 550, replies: 35 },
  { name: 'Thu', sent: 480, replies: 28 },
  { name: 'Fri', sent: 620, replies: 42 },
  { name: 'Sat', sent: 200, replies: 10 },
  { name: 'Sun', sent: 150, replies: 5 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Overview</h2>
          <p className="text-slate-400 mt-1">Track your outreach performance and lead generation.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-800 text-slate-300 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads Found" 
          value="1,240" 
          change="+12.5%" 
          isPositive={true} 
          icon={Users} 
          color="bg-blue-500 text-blue-500" 
        />
        <StatCard 
          title="Messages Sent" 
          value="854" 
          change="+8.2%" 
          isPositive={true} 
          icon={Mail} 
          color="bg-purple-500 text-purple-500" 
        />
        <StatCard 
          title="Reply Rate" 
          value="12.3%" 
          change="+2.1%" 
          isPositive={true} 
          icon={MessageSquare} 
          color="bg-pink-500 text-pink-500" 
        />
        <StatCard 
          title="Meetings Booked" 
          value="42" 
          change="-1.5%" 
          isPositive={false} 
          icon={TrendingUp} 
          color="bg-emerald-500 text-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-6">Outreach Activity</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
              <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="sent" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="replies" stroke="#d946ef" strokeWidth={3} fillOpacity={1} fill="url(#colorReplies)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-6">Engagement by Channel</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={[
              { name: 'Email', value: 65 },
              { name: 'LinkedIn', value: 45 },
              { name: 'WhatsApp', value: 25 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
              <Tooltip 
                 cursor={{fill: '#334155', opacity: 0.4}}
                 contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
