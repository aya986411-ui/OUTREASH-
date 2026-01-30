import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import MessageGenerator from './pages/MessageGenerator';
import Onboarding from './pages/Onboarding';
import { Bell, Search } from 'lucide-react';

// Placeholder components for routes not yet implemented
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500">
    <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
    <p>This module is under development.</p>
  </div>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background text-slate-100 font-sans selection:bg-primary/30 flex items-start justify-center overflow-y-auto py-12 px-4">
         <div className="w-full max-w-6xl">
            <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
         </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-background text-slate-100 font-sans selection:bg-primary/30">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 ml-64 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-20 border-b border-slate-800 bg-background/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="font-medium text-slate-200 capitalize">{activePage.replace('-', ' ')}</span>
              <span>/</span>
              <span>Overview</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative hidden md:block group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="bg-slate-900/50 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
                />
              </div>
              <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8 flex-1 overflow-y-auto">
             {/* Note: In a real app with react-router-dom, we'd use <Link> in Sidebar. 
                 Here we control display based on state for simplicity in this specific "handful of files" constraint, 
                 or we can map the state to routes if we were fully using the router for navigation.
                 To adhere to "No BrowserRouter" but "HashRouter allowed", let's strictly use the Routes 
                 and simulate navigation if we were clicking links.
                 However, since Sidebar uses state `setActivePage`, let's just render conditionally for smoothness.
             */}
             
             {activePage === 'dashboard' && <Dashboard />}
             {activePage === 'leads' && <Leads />}
             {activePage === 'campaigns' && <Placeholder title="Campaigns Management" />}
             {activePage === 'generator' && <MessageGenerator />}
             {activePage === 'onboarding' && <Onboarding />}
             {activePage === 'analytics' && <Placeholder title="Deep Analytics" />}
             {activePage === 'settings' && <Placeholder title="System Settings" />}
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;