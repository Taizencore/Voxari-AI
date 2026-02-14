import React from 'react';
export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Business Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">Active Calls: 12</div>
        <div className="bg-white p-6 rounded shadow">ROI: +$4,500</div>
      </div>
    </div>
  );
}
