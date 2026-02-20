import React from 'react';
export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Settings</h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
        <h3 className="text-lg font-bold mb-6 border-b pb-4">General Configuration</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Practice Name</label>
            <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" defaultValue="Miami Luxury MedSpa" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Voice Identity Mode</label>
            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <option>Fixed Identity (Emma)</option>
              <option>Rotating Pool</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
