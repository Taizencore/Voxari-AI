import React from 'react';
export default function WorkforcePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">AI Workforce</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-200">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-6 py-4 font-medium">Emma</td>
              <td className="px-6 py-4 text-slate-600">Front Desk</td>
              <td className="px-6 py-4 text-slate-600">Receptionist</td>
              <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full uppercase">Online</span></td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-6 py-4 font-medium">Chloe</td>
              <td className="px-6 py-4 text-slate-600">Billing</td>
              <td className="px-6 py-4 text-slate-600">Billing Specialist</td>
              <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full uppercase">Online</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
