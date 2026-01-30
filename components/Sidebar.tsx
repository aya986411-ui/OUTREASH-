import React from 'react';
import { LayoutDashboard, Users, Send, BarChart2, Settings, Sparkles, ClipboardList } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads Discovery', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Send },
    { id: 'generator', label: 'AI Generator', icon: Sparkles },
    { id: 'onboarding', label: 'Client Onboarding', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">SmartReach</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium">{item.label}</span>
              {item.id === 'leads' && (
                <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  12
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <img
            src="https://picsum.photos/40/40"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-slate-700"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
