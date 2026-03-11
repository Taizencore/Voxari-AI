import React from 'react';

export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Business Overview</h2>
          <p className="text-slate-500 mt-1">Real-time performance of your AI workforce.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">Export Report</button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-slate-900/20 hover:bg-slate-800 transition">View Live Calls</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Active Calls</span>
          </div>
          <p className="text-5xl font-black text-slate-900 tracking-tighter">12</p>
          <p className="text-xs text-slate-400 mt-4">+3 since last hour</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            <span>Leads Generated</span>
          </div>
          <p className="text-5xl font-black text-slate-900 tracking-tighter">1,284</p>
          <p className="text-xs text-green-600 mt-4 font-bold">↑ 12% growth</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 bg-gradient-to-br from-white to-slate-50">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            <span>AI ROI Attribution</span>
          </div>
          <p className="text-5xl font-black text-green-600 tracking-tighter">+$4,500</p>
          <p className="text-xs text-slate-400 mt-4">Calculated from booked slots</p>
        </div>
      </div>

      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Autonomous Growth Engine</h3>
          <span className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full uppercase tracking-widest">Phase: Outreach</span>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold">Scaling Practice Operations</h4>
            <p className="text-slate-500 max-w-md mt-2">The AI is currently performing cold outreach to local medspas to schedule discovery calls for the sales team.</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-red-50 text-red-600 border border-red-100 px-8 py-3 rounded-2xl font-bold hover:bg-red-100 transition">Pause Engine</button>
            <button className="bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-200 transition">Config Rules</button>
          </div>
        </div>
      </section>
    </div>
  );
}
