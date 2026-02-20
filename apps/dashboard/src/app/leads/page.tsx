import React from 'react';
export default function LeadsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Growth & Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Autonomous Searching</h3>
          <p className="text-slate-600 mb-6 text-sm italic">"Searching for MedSpas in the Miami area..."</p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Outreach Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">Calls Today</span>
              <span className="font-bold">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">SMS Today</span>
              <span className="font-bold">128</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
